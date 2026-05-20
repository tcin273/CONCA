"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type OrderItem = {
  title: string;
  quantity: number;
  price: number;
  option?: string;
};

type Order = {
  id: string;
  createdAt?: string;
  items?: OrderItem[];
  totalPrice?: number;
  status?: string;
};

type OrdersTableProps = {
  initialOrders: Order[];
};

export default function OrdersTable({ initialOrders }: OrdersTableProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleDelete = async (orderId: string) => {
    if (!confirm("Bạn có chắc muốn xóa đơn này?")) {
      return;
    }
    setError("");
    setLoadingId(orderId);
    try {
      const res = await fetch("/api/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrders((current) => current.filter((order) => order.id !== orderId));
      } else {
        setError(data.message || "Xóa đơn hàng thất bại.");
      }
    } catch (err) {
      setError("Lỗi mạng, thử lại sau.");
    } finally {
      setLoadingId(null);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600">Chưa có đơn hàng.</div>
    );
  }

  return (
    <>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Mã đơn</th>
            <th>Ngày</th>
            <th>Giá</th>
            <th className="hidden md:block">Sản phẩm</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.slice().reverse().map((o) => {
            const products = Array.isArray(o.items)
              ? o.items.map((it) => `${it.title} (${it.quantity})`).join(", ")
              : "";
            const date = o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "-";
            const total = o.totalPrice ?? (Array.isArray(o.items) ? o.items.reduce((s, it) => s + it.price * it.quantity, 0) : 0);

            return (
              <tr key={o.id} className="text-sm md:text-base odd:bg-gray-100">
                <td className="hidden md:block py-6 px-1">{o.id}</td>
                <td className="py-6 px-1">{date}</td>
                <td className="py-6 px-1">{Number(total).toFixed(2)}</td>
                <td className="hidden md:block py-6 px-1">{products}</td>
                <td className="py-6 px-1">{o.status ?? "Đang chờ"}</td>
                <td className="py-6 px-1">
                  <button
                    type="button"
                    onClick={() => handleDelete(o.id)}
                    disabled={loadingId === o.id}
                    className="text-sm text-red-600 hover:underline disabled:text-gray-400"
                  >
                    {loadingId === o.id ? "Đang xóa..." : "Xóa"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
