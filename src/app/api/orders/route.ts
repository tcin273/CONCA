import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ordersPath = path.join(process.cwd(), "src", "app", "api", "orders", "orders.json");

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
    await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2), "utf8");

    return new Response(JSON.stringify({ ok: true, orderId: id }), { status: 201 });
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

    await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2), "utf8");

    return new Response(JSON.stringify({ ok: true, order: orders[orderIndex] }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, message: (err as Error).message }), { status: 500 });
  }
}
