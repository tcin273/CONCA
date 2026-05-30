"use client";

import { featuredProducts } from "@/data";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { formatVND } from "@/lib/formatCurrency";

const Featured = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { addToCart } = useCart();
  const isLoggedIn = Boolean(session?.user);
  const handleAdd = (item: any) => {
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
  };

  return (
    <div className="w-screen overflow-x-scroll text-red-500">
      {/* WRAPPER */}
      <div className="w-max flex">
        {/* SINGLE ITEM */}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {/* IMAGE CONTAINER */}
            {item.img && (
              <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
                <Image src={item.img} alt="" fill className="object-contain" />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className=" flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">{item.title}</h1>
              <p className="p-4 2xl:p-8">{item.desc}</p>
              <span className="text-xl font-bold">{formatVND(item.price)}</span>
              <button
                type="button"
                onClick={() => handleAdd(item)}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                {isLoggedIn ? "Thêm vào giỏ" : "Đăng nhập để mua"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
