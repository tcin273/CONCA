"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
import { useSession } from "next-auth/react";

const links = [
  { id: 1, title: "Trang chủ", url: "/" },
  { id: 2, title: "Thực đơn", url: "/menu" },
  { id: 3, title: "Đơn hàng", url: "/orders" },
  { id: 4, title: "Liên hệ", url: "/contact" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div>
      {/* LONG WAY */}
      {/* {!open ? (
        <Image
          src="/open.png"
          alt=""
          width={20}
          height={20}
          onClick={() => setOpen(true)}
        />
      ) : (
        <Image
          src="/close.png"
          alt=""
          width={20}
          height={20}
          onClick={() => setOpen(false)}
        />
      )} */}
      
      {/* SHORTCUT */}
      <Image
        src={open ? "/close.png" : "/open.png"}
        alt=""
        width={20}
        height={20}
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      />
      {open && (
        <div className="bg-red-500 text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-6 items-center justify-center text-xl z-10">
          {links.map((item) => (
            <Link href={item.url} key={item.id} onClick={() => setOpen(false)} className="text-xl">
              {item.title}
            </Link>
          ))}

          {/* CÁCH DÀI */}
          {/* {!user ? (
            <Link href="/login" onClick={() => setOpen(false)}>
              Đăng nhập
            </Link>
          ) : (
            <Link href="/orders" onClick={() => setOpen(false)}>
              Đơn hàng
            </Link>
          )} */}

          {/* CÁCH NGẮN */}
          <Link
            href={user ? "/profile" : "/login"}
            onClick={() => setOpen(false)}
          >
            {user ? "Hồ sơ" : "Đăng nhập"}
          </Link>
          <Link href="/cart" onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
