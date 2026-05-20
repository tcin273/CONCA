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
    const { orderId } = body as { orderId?: string };
    if (!orderId) {
      return new Response(JSON.stringify({ ok: false, message: "Thiếu orderId." }), { status: 400 });
    }

    const ordersPath = path.join(process.cwd(), "src", "app", "api", "orders", "orders.json");
    const file = await fs.readFile(ordersPath, "utf8");
    const orders = JSON.parse(file || "[]") as any[];
    const filtered = orders.filter((order) => order.id !== orderId);

    await fs.writeFile(ordersPath, JSON.stringify(filtered, null, 2), "utf8");

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, message: (err as Error).message }), { status: 500 });
  }
}
