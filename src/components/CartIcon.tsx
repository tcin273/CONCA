"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCart } from "@/context/CartContext";

const CartIcon = () => {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="flex items-center gap-2 text-sm md:text-base">
      <div className="relative w-5 h-5">
        <Image src="/cart.png" alt="" fill />
      </div>
      <span>Giỏ hàng ({totalItems})</span>
    </Link>
  );
};

export default CartIcon;
