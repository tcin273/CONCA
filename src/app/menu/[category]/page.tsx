"use client";

import { burgers, pastas, pizzas } from "@/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { formatVND } from "@/lib/formatCurrency";

const CategoryPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { addToCart } = useCart();
  const isLoggedIn = Boolean(session?.user);
  const params = useParams();
  const pathname = usePathname();
  let category = params?.category as string | undefined;
  if (!category && pathname) {
    const parts = pathname.split("/").filter(Boolean);
    category = parts[parts.length - 1];
  }

  const items =
    category === "pastas"
      ? pastas
      : category === "burgers"
      ? burgers
      : category === "pizzas"
      ? pizzas
      : [];

  if (!items.length) {
    return <div className="p-8 text-center text-red-500">Không có sản phẩm cho danh mục này.</div>;
  }

  return (
    <div className="flex flex-wrap text-red-500">
      {items.map((item) => (
        <Link className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50" href={`/product/${item.id}`} key={item.id}>
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt="" fill className="object-contain"/>
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">{formatVND(item.price)}</h2>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (!isLoggedIn) {
                  router.push("/login");
                  return;
                }
                addToCart({
                  id: item.id,
                  title: item.title,
                  price: item.price,
                  img: item.img,
                });
              }}
              className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md"
            >
              {isLoggedIn ? "Thêm vào giỏ" : "Đăng nhập để mua"}
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
