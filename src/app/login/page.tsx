"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  // Trạng thái: true nghĩa là Đăng nhập, false nghĩa là Đăng ký
  const [isLogin, setIsLogin] = useState(true);

  // Các State quản lý dữ liệu input
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Xử lý gửi dữ liệu Đăng nhập
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      console.log("signIn result:", res);
      if (res?.error) {
        setError("Tên đăng nhập hoặc mật khẩu không chính xác!");
      } else {
        // Đăng nhập thành công, chuyển hướng về trang profile và refresh lại trạng thái
        router.push("/profile");
        router.refresh();
      }
    } catch (err) {
      setError("Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý gửi dữ liệu Đăng ký
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Đăng ký thất bại. Vui lòng thử lại!");
      } else {
        alert("Đăng ký tài khoản thành công!");
        setFullName("");
        setPhone("");
        setIsLogin(true); // Tự động chuyển sang tab đăng nhập
      }
    } catch (err) {
      setError("Không thể kết nối đến máy chủ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F4] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[430px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[32px] flex flex-col items-center border border-[#F5EBE1]">
        
        {isLogin ? (
          <>
            {/* ====== GIAO DIỆN ĐĂNG NHẬP ====== */}
            <h1 className="text-2xl font-bold text-black flex items-center gap-2 mb-2 tracking-wide uppercase">
               Massimo
            </h1>
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Đăng nhập</h2>

            {error && (
              <div className="w-full bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4 border border-red-200 text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="w-full flex flex-col gap-4">
              <input
                type="text"
                placeholder="Tên đăng nhập"
                value={username}
                className="w-full p-3.5 border border-gray-300 rounded-xl outline-none text-black text-base placeholder-gray-400 focus:border-gray-400 transition-all"
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                className="w-full p-3.5 border-2 border-black rounded-xl outline-none text-black text-base placeholder-gray-400 font-medium focus:bg-gray-50 transition-all"
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-500 text-white p-3.5 rounded-xl font-bold hover:bg-red-600 transition-all text-center mt-2 text-base disabled:opacity-50"
              >
                {loading ? "Đang xử lý..." : "Đăng nhập"}
              </button>
            </form>

            <button
              onClick={() => {
                setIsLogin(false);
                setError("");
              }}
              disabled={loading}
              className="w-full mt-3 border-2 border-black text-black p-3.5 rounded-xl font-bold hover:bg-gray-50 transition-all text-center text-base disabled:opacity-50"
            >
              Đăng ký
            </button>

            <p className="text-sm text-gray-400 mt-6 text-center">
              Đăng nhập để mua hàng của bạn.
            </p>
          </>
        ) : (
          <>
            {/* ====== GIAO DIỆN ĐĂNG KÝ ====== */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Đăng ký</h2>

            {error && (
              <div className="w-full bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4 border border-red-200 text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="w-full flex flex-col gap-4">
              <input
                type="text"
                placeholder="Họ và tên *"
                value={fullName}
                className="w-full p-3.5 border border-gray-300 rounded-xl outline-none text-black text-base placeholder-gray-400 focus:border-gray-400 transition-all"
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={loading}
              />
              <input
                type="text"
                placeholder="Tên đăng nhập *"
                value={username}
                className="w-full p-3.5 border border-gray-300 rounded-xl outline-none text-black text-base placeholder-gray-400 focus:border-gray-400 transition-all"
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
              <input
                type="password"
                placeholder="Mật khẩu *"
                value={password}
                className="w-full p-3.5 border-2 border-black rounded-xl outline-none text-black text-base placeholder-gray-400 font-medium focus:bg-gray-50 transition-all"
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                value={phone}
                className="w-full p-3.5 border border-gray-300 rounded-xl outline-none text-black text-base placeholder-gray-400 focus:border-gray-400 transition-all"
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-500 text-white p-3.5 rounded-xl font-bold hover:bg-red-600 transition-all text-center mt-2 text-base disabled:opacity-50"
              >
                {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
              </button>
            </form>

            <button
              onClick={() => {
                setIsLogin(true);
                setError("");
              }}
              disabled={loading}
              className="w-full mt-3 border-2 border-black text-black p-3.5 rounded-xl font-bold hover:bg-gray-50 transition-all text-center text-base disabled:opacity-50"
            >
              Trở lại
            </button>

            <p className="text-sm text-gray-400 mt-6 text-center">
              Tạo tài khoản để đặt hàng mà bạn muốn.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// ĐÂY CHÍNH LÀ DÒNG QUAN TRỌNG ĐỂ SỬA LỖI CRASH NEXT.JS:
export default AuthPage;