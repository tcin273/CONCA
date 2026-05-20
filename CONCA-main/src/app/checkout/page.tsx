"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

const CheckoutPage = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !phone || !address) {
      setError("Vui lòng điền đầy đủ thông tin giao hàng.");
      return;
    }
    // optional simple email format check
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Vui lòng nhập email hợp lệ hoặc để trống.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          email,
          phone,
          address,
          note,
          items: cartItems,
          totalPrice,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        clearCart();
        router.push(`/thank-you?orderId=${data.orderId}`);
      } else {
        setError(data.message || "Đặt hàng thất bại.");
      }
    } catch (err) {
      setError("Lỗi kết nối, thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 lg:px-20 xl:px-40">
      <div className="max-w-3xl mx-auto bg-white rounded-[24px] shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Thanh toán</h1>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tên khách hàng</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Họ và tên" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Số điện thoại</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Số điện thoại" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email (tuỳ chọn)</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Email liên hệ" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Địa chỉ giao hàng</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Địa chỉ nhận hàng" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ghi chú (tuỳ chọn)</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Ghi chú cho người giao hàng" />
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="font-semibold mb-2">Tổng giỏ hàng</h2>
            <div className="flex justify-between">
              <div>{cartItems.length} sản phẩm</div>
              <div className="font-bold">{totalPrice.toFixed(2)}</div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-red-500 text-white p-3 rounded-xl">
            {loading ? "Đang đặt hàng..." : "Đặt hàng"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
