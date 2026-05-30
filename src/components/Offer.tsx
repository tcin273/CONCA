import Image from "next/image";
import React from "react";

const Offer = () => {
  return (
    <div className="bg-black min-h-[70vh] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 md:bg-[url('/offerBg.png')]">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left gap-6 p-6 md:px-10">
        <div className="w-full max-w-lg">
          <h1 className="text-white text-4xl md:text-5xl xl:text-6xl font-bold leading-tight break-words">
            Burger thơm ngậy và khoai tây chiên
          </h1>
          <p className="text-white text-base md:text-lg xl:text-xl mt-4">
            Burger ngon miệng với thịt tươi, phô mai đậm vị và topping hấp dẫn.
          </p>
          <button className="mt-6 bg-red-500 text-white rounded-md py-3 px-6">Đặt ngay</button>
        </div>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="flex-1 w-full max-w-3xl p-6 md:p-0">
        <div className="relative h-72 md:h-[65vh] w-full">
          <Image src="/offerProduct.png" alt="" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Offer;
