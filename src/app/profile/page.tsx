"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-base text-gray-700">Đang tải thông tin người dùng...</div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 text-center max-w-lg">
          <h1 className="text-2xl font-bold mb-4">Bạn chưa đăng nhập</h1>
          <p className="text-gray-600 mb-6">Vui lòng đăng nhập để xem thông tin tài khoản.</p>
          <button
            className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600"
            onClick={() => router.push("/login")}
          >
            Đến trang đăng nhập
          </button>
        </div>
      </div>
    );
  }

  const user = session.user as { name?: string; username?: string; email?: string };

  return (
    <div className="min-h-screen p-4 lg:px-20 xl:px-40">
      <div className="max-w-3xl mx-auto bg-white rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-[#F5EBE1] p-8">
        <h1 className="text-3xl font-bold mb-4">Thông tin khách hàng</h1>
        <p className="text-gray-600 mb-8">Chào mừng bạn, {user.name || user.username}!</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-[#FFFAF5] border border-[#F5EBE1] rounded-3xl p-5">
            <h2 className="font-semibold mb-2">Tên khách hàng</h2>
            <p className="text-lg text-gray-800">{user.name || "Chưa có"}</p>
          </div>
          <div className="bg-[#FFFAF5] border border-[#F5EBE1] rounded-3xl p-5">
            <h2 className="font-semibold mb-2">Tên đăng nhập</h2>
            <p className="text-lg text-gray-800">{user.username || "Chưa có"}</p>
          </div>
          <div className="bg-[#FFFAF5] border border-[#F5EBE1] rounded-3xl p-5 sm:col-span-2">
            <h2 className="font-semibold mb-2">Email</h2>
            <p className="text-lg text-gray-800">{user.email || "Không có email"}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600"
            onClick={() => router.push("/")}
          >
            Trang chủ
          </button>
          <button
            className="border border-gray-700 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100"
            onClick={async () => {
              if (!confirm("Bạn có chắc muốn đăng xuất?")) return;
              await signOut({ redirect: false });
              router.push("/login");
              router.refresh();
            }}
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
