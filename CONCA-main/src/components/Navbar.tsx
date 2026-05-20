"use client";

import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  
  return (
    <div className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-6 flex-1 text-sm tracking-wide uppercase text-red-500">
        <Link href="/">Trang chủ</Link>
        <Link href="/menu">Thực đơn</Link>
        <Link href="/contact">Liên hệ</Link>
      </div>
      {/* LOGO */}
      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link href="/">Massimo</Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-6 items-center justify-end flex-1 text-sm tracking-wide uppercase text-red-500">
        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span>0987654321</span>
        </div>
        {!user ? (
          <Link href="/login">Đăng nhập</Link>
        ) : (
          <Link href="/profile" className="text-red-500">Hồ sơ</Link>
        )}
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
