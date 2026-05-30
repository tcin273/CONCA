import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import { formatVND } from "@/lib/formatCurrency";

type Props = {
  searchParams?: { orderId?: string };
};

export default async function ThankYouPage({ searchParams }: Props) {
  const id = searchParams?.orderId;
  let order: any = null;

  if (id) {
    try {
      const ordersPath = path.join(process.cwd(), "src", "app", "api", "orders", "orders.json");
      const file = await fs.readFile(ordersPath, "utf8");
      const orders = JSON.parse(file || "[]");
      order = orders.find((o: any) => o.id === id) ?? null;
    } catch (e) {
      order = null;
    }
  }

  return (
    <div className="min-h-screen p-4 lg:px-20 xl:px-40 flex items-center justify-center">
      <div className="max-w-3xl bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold mb-4 text-red-500">Cảm ơn bạn!</h1>
        <p className="mb-4">Đơn hàng của bạn đã được ghi nhận.</p>
        <p className="mb-4">Đơn hàng của bạn dự kiến sẽ được giao trong vòng 30 phút tới. Xin vui lòng chú ý điện thoại để nhân viên giao hàng tiện liên hệ nhé. Nếu có bất kỳ vấn đề gì phát sinh, bạn vui lòng liên hệ trực tiếp với cửa hàng để được hỗ trợ xử lý kịp thời. Cảm ơn bạn!</p>

        {order ? (
          <div className="space-y-4">
            <p>Mã đơn hàng: <strong>{order.id}</strong></p>
            <p>Ngày: {new Date(order.createdAt).toLocaleString()}</p>
            <div className="border rounded p-4">
              <h3 className="font-semibold mb-2">Thông tin khách hàng</h3>
              <p><strong>Tên:</strong> {order.customerName}</p>
              {order.email && <p><strong>Email:</strong> {order.email}</p>}
              <p><strong>Điện thoại:</strong> {order.phone}</p>
              <p><strong>Địa chỉ:</strong> {order.address}</p>
              {order.note && <p><strong>Ghi chú:</strong> {order.note}</p>}
            </div>

            <div className="border rounded p-4">
              <h3 className="font-semibold mb-2">Sản phẩm</h3>
              <ul className="space-y-2">
                {Array.isArray(order.items) && order.items.map((it: any, idx: number) => (
                  <li key={idx} className="flex justify-between">
                    <div>
                      <div className="font-medium">{it.title}</div>
                      {it.option && <div className="text-sm text-gray-500">{it.option}</div>}
                      <div className="text-sm text-gray-500">Số lượng: {it.quantity}</div>
                    </div>
                    <div className="font-semibold">{formatVND(it.price * it.quantity)}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-lg font-semibold">Tổng</div>
              <div className="text-xl font-bold">{formatVND(Number(order.totalPrice))}</div>
            </div>
          </div>
        ) : (
          <p className="mb-4">Không tìm thấy thông tin đơn hàng.</p>
        )}

        <div className="flex gap-4 justify-center mt-6">
          <Link href="/" className="px-4 py-2 bg-red-500 text-white rounded-lg">Về trang chủ</Link>
        </div>
      </div>
    </div>
  );
}
