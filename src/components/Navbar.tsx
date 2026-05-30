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
      <div className="hidden md:flex flex-nowrap gap-6 flex-1 text-sm tracking-wide uppercase text-red-500">
        <Link href="/" className="whitespace-nowrap">Trang chủ</Link>
        <Link href="/menu" className="whitespace-nowrap">Thực đơn</Link>
        <Link href="/orders" className="whitespace-nowrap">Đơn hàng</Link>
        <Link href="/contact" className="whitespace-nowrap">Liên hệ</Link>
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
      <div className="hidden md:flex gap-4 items-center justify-end flex-1 text-sm tracking-wide uppercase text-red-500">
        {!user ? (
          <Link href="/login" className="hover:text-red-600">Đăng nhập</Link>
        ) : (
          <Link href="/profile" className="hover:text-red-600">Hồ sơ</Link>
        )}
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
