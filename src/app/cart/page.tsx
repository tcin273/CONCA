"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { formatVND } from "@/lib/formatCurrency";

const CartPage = () => {
  const { data: session } = useSession();
  const { cartItems, totalItems, totalPrice, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const isLoggedIn = Boolean(session?.user);

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600">
            Giỏ hàng trống.
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={`${item.id}-${item.option ?? "default"}`} className="flex items-center justify-between mb-4 gap-4">
              <div className="flex-1 px-4">
                <h1 className="uppercase text-xl font-bold">{item.title}</h1>
                {item.option && <span className="text-sm text-gray-500">{item.option}</span>}
                <p className="text-gray-600">Số lượng: {item.quantity}</p>
              </div>
              <div className="text-right">
                <h2 className="font-bold">{formatVND(item.price * item.quantity)}</h2>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id, item.option)}
                  className="text-sm text-red-500 mt-2"
                >
                  Hủy
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Tạm tính ({totalItems} sản phẩm)</span>
          <span className="">{formatVND(totalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Phí dịch vụ</span>
          <span className="">{formatVND(0)}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Phí giao hàng</span>
          <span className="text-green-500">MIỄN PHÍ</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TỔNG (ĐÃ VAT)</span>
          <span className="font-bold">{formatVND(totalPrice)}</span>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="bg-white text-red-500 border border-red-500 p-3 rounded-md w-full text-center font-bold"
        >
          Hủy giỏ hàng
        </button>
        <button
          type="button"
          onClick={() => {
            if (cartItems.length === 0) return;
            if (!isLoggedIn) {
              router.push("/login");
              return;
            }
            router.push("/checkout");
          }}
          disabled={cartItems.length === 0}
          className={`p-3 rounded-md w-full text-center font-bold ${cartItems.length === 0 ? 'bg-gray-300 text-gray-600' : 'bg-red-500 text-white'}`}
        >
          {isLoggedIn ? "THANH TOÁN" : "Đăng nhập để thanh toán"}
        </button>
      </div>
    </div>
  );
};

export default CartPage;
