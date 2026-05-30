import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const useSupabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
const supabase = useSupabase && supabaseUrl && supabaseKey ? createClient(supabaseUrl as string, supabaseKey as string) : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ordersPath = path.join(process.cwd(), "src", "app", "api", "orders", "orders.json");

    // If Supabase configured, try to insert there first (recommended for Vercel)
    if (useSupabase && supabase) {
      try {
        const id = Date.now().toString();
        const order = {
          id,
          createdAt: new Date().toISOString(),
          username: body.username,
          ...body,
        } as any;
        const insert = await supabase.from("orders").insert([order]);
        if ((insert as any).error) throw (insert as any).error;
        return new Response(JSON.stringify({ ok: true, orderId: id, source: "supabase" }), { status: 201 });
      } catch (supErr) {
        // fall back to file/global below
      }
    }

    let orders = [] as any[];
    try {
      const file = await fs.readFile(ordersPath, "utf8");
      orders = JSON.parse(file || "[]");
    } catch (e) {
      orders = [];
    }

    const id = Date.now().toString();
    const order = {
      id,
      createdAt: new Date().toISOString(),
      username: body.username,
      ...body,
    };

    orders.push(order);
    try {
      await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2), "utf8");
      return new Response(JSON.stringify({ ok: true, orderId: id }), { status: 201 });
    } catch (writeErr: any) {
      // If filesystem is read-only (EROFS) on the platform, fallback to in-memory global store
      const g: any = global as any;
      g.globalOrders = g.globalOrders || [];
      g.globalOrders.push(order);
      return new Response(JSON.stringify({ ok: true, orderId: id, note: 'stored-in-memory' }), { status: 201 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, message: (err as Error).message }), { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { orderId, reason } = body as { orderId?: string; reason?: string };
    if (!orderId) {
      return new Response(JSON.stringify({ ok: false, message: "Thiếu orderId." }), { status: 400 });
    }
    if (!reason?.trim()) {
      return new Response(JSON.stringify({ ok: false, message: "Thiếu lý do hủy đơn." }), { status: 400 });
    }

    // If Supabase configured, try to update there first
    if (useSupabase && supabase) {
      try {
        const { data: existing } = await supabase.from("orders").select("*").eq("id", orderId).limit(1);
        const order = existing && existing[0];
        if (!order) return new Response(JSON.stringify({ ok: false, message: "Không tìm thấy đơn hàng." }), { status: 404 });
        if (order.status === "Đã hủy") return new Response(JSON.stringify({ ok: false, message: "Đơn hàng đã được hủy trước đó." }), { status: 400 });
        const created = order.createdAt ? new Date(order.createdAt).getTime() : NaN;
        if (Number.isNaN(created)) return new Response(JSON.stringify({ ok: false, message: "Dữ liệu createdAt không hợp lệ." }), { status: 400 });
        const fiveMinutes = 5 * 60 * 1000;
        if (Date.now() - created > fiveMinutes) return new Response(JSON.stringify({ ok: false, message: "Đã quá 5 phút, không thể hủy đơn." }), { status: 400 });
        const updates = {
          status: "Đã hủy",
          cancelReason: reason.trim(),
          cancelledAt: new Date().toISOString(),
        };
        const upd = await supabase.from("orders").update(updates).eq("id", orderId);
        if ((upd as any).error) throw (upd as any).error;
        return new Response(JSON.stringify({ ok: true, order: { ...order, ...updates }, source: "supabase" }), { status: 200 });
      } catch (supErr) {
        // fall through to file/global below
      }
    }

    const ordersPath = path.join(process.cwd(), "src", "app", "api", "orders", "orders.json");
    const file = await fs.readFile(ordersPath, "utf8");
    const orders = JSON.parse(file || "[]") as any[];
    const orderIndex = orders.findIndex((order) => order.id === orderId);

    if (orderIndex === -1) {
      return new Response(JSON.stringify({ ok: false, message: "Không tìm thấy đơn hàng." }), { status: 404 });
    }

    const order = orders[orderIndex];
    // kiểm tra đã hủy trước đó
    if (order.status === "Đã hủy") {
      return new Response(JSON.stringify({ ok: false, message: "Đơn hàng đã được hủy trước đó." }), { status: 400 });
    }
    // kiểm tra khoảng cách thời gian so với createdAt (5 phút)
    const created = order.createdAt ? new Date(order.createdAt).getTime() : NaN;
    if (Number.isNaN(created)) {
      return new Response(JSON.stringify({ ok: false, message: "Dữ liệu createdAt không hợp lệ." }), { status: 400 });
    }
    const fiveMinutes = 5 * 60 * 1000;
    if (Date.now() - created > fiveMinutes) {
      return new Response(JSON.stringify({ ok: false, message: "Đã quá 5 phút, không thể hủy đơn." }), { status: 400 });
    }
    orders[orderIndex] = {
      ...order,
      status: "Đã hủy",
      cancelReason: reason.trim(),
      cancelledAt: new Date().toISOString(),
    };

    try {
      await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2), "utf8");
      return new Response(JSON.stringify({ ok: true, order: orders[orderIndex] }), { status: 200 });
    } catch (writeErr: any) {
      const g: any = global as any;
      g.globalOrders = g.globalOrders || [];
      // keep in-memory state in sync
      const memIndex = g.globalOrders.findIndex((o: any) => o.id === orderId);
      if (memIndex !== -1) {
        g.globalOrders[memIndex] = orders[orderIndex];
      } else {
        g.globalOrders.push(orders[orderIndex]);
      }
      return new Response(JSON.stringify({ ok: true, order: orders[orderIndex], note: 'stored-in-memory' }), { status: 200 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, message: (err as Error).message }), { status: 500 });
  }
}
