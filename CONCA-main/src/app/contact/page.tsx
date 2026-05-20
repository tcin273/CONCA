"use client";

import React, { useState } from "react";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", text: data.message || "Gửi yêu cầu thất bại." });
      } else {
        setStatus({ type: "success", text: data.message || "Gửi yêu cầu thành công!" });
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      setStatus({ type: "error", text: "Không thể gửi yêu cầu. Vui lòng thử lại." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDF8F4] text-red-500 px-4 py-10 lg:px-20 xl:px-40">
      <div className="max-w-4xl mx-auto bg-white rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[#F5EBE1] p-8">
        <h1 className="text-4xl font-bold uppercase mb-6 text-center">Liên hệ</h1>
        <p className="text-base text-gray-600 mb-8">
          Nếu bạn cần hỗ trợ hoặc muốn đặt hàng, vui lòng liên hệ với chúng tôi theo thông tin bên dưới.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
            <h2 className="text-2xl font-bold mb-3">Thông tin liên hệ</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="font-semibold">Địa chỉ</p>
                <p>123 Bửu Long, Biên Hòa</p>
              </div>
              <div>
                <p className="font-semibold">Điện thoại</p>
                <p>0987654321</p>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p>support@massimo.com</p>
              </div>
              <div>
                <p className="font-semibold">Giờ mở cửa</p>
                <p>Thứ 2 - Chủ nhật: 09:00 - 22:00</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-3">Gửi thông tin cho chúng tôi</h2>
            <p className="text-gray-600 mb-6">
              Bạn có thể dùng form dưới đây để gửi yêu cầu hoặc góp ý. Chúng tôi sẽ phản hồi trong vòng 24h.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Tên của bạn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 bg-white p-4 outline-none focus:border-red-400"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 bg-white p-4 outline-none focus:border-red-400"
                required
              />
              <textarea
                placeholder="Nội dung liên hệ"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full min-h-[140px] rounded-2xl border border-gray-300 bg-white p-4 outline-none focus:border-red-400"
                required
              />
              {status && (
                <div
                  className={`rounded-2xl p-4 text-sm ${
                    status.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-100"
                      : "bg-red-50 text-red-700 border border-red-100"
                  }`}
                >
                  {status.text}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-red-500 px-6 py-4 text-white font-bold hover:bg-red-600 transition-all disabled:opacity-50"
              >
                {loading ? "Đang gửi..." : "Gửi yêu cầu"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
