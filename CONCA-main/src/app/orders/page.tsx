import fs from "fs/promises";
import path from "path";

async function readOrders() {
  try {
    const ordersPath = path.join(process.cwd(), "src", "app", "api", "orders", "orders.json");
    const raw = await fs.readFile(ordersPath, "utf8");
    return JSON.parse(raw || "[]");
  } catch (e) {
    return [];
  }
}

import OrdersTable from "@/components/OrdersTable";

export default async function OrdersPage() {
  const orders = await readOrders();

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <h1 className="text-2xl font-bold text-red-500 mb-6">ĐƠN HÀNG</h1>
      <OrdersTable initialOrders={orders} />
    </div>
  );
}
