"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { formatVND } from "@/lib/formatCurrency";

type Props = {
  price: number;
  id: number;
  title?: string;
  img?: string;
  options?: { title: string; additionalPrice: number }[];
};

const Price = ({ price, id, title = "Sản phẩm", img, options }: Props) => {
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const { data: session } = useSession();
  const router = useRouter();
  const { addToCart } = useCart();
  const isLoggedIn = Boolean(session?.user);

  const selectedOption = options?.[selected];
  const optionPrice = selectedOption?.additionalPrice ?? 0;
  const currentPrice = price + optionPrice;
  const showOptions = options && options.length > 1;
  const cartOption = options?.length === 1 ? undefined : selectedOption?.title;

  useEffect(() => {
    setTotal(quantity * currentPrice);
  }, [quantity, currentPrice]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{formatVND(total)}</h2>
      {/* OPTIONS CONTAINER */}
      {showOptions && (
        <div className="flex gap-4">
          {options.map((option, index) => (
            <button
              key={option.title}
              className="min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md"
              style={{
                background: selected === index ? "rgb(248 113 113)" : "white",
                color: selected === index ? "white" : "red",
              }}
              onClick={() => setSelected(index)}
            >
              {option.title}
            </button>
          ))}
        </div>
      )}
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex w-full overflow-hidden rounded-md border border-red-500">
        <div className="flex flex-1 min-w-[220px] items-center justify-between gap-4 bg-white px-4 py-3">
          <span className="text-sm font-semibold uppercase tracking-[0.08em] text-red-500 leading-tight">
            Số<br />
            lượng
          </span>
          <div className="flex items-center gap-2 text-red-500">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-md border border-red-500 text-base font-bold"
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span className="min-w-[1.75rem] text-center text-base font-semibold">
              {quantity}
            </span>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-md border border-red-500 text-base font-bold"
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            if (!isLoggedIn) {
              router.push("/login");
              return;
            }
            addToCart(
              {
                id,
                title,
                price: currentPrice,
                img,
                option: cartOption,
              },
              quantity
            );
          }}
          className="flex-none bg-red-500 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-red-600"
        >
          {isLoggedIn ? "Thêm vào giỏ" : "Đăng nhập để mua"}
        </button>
      </div>
    </div>
  );
};

export default Price;
