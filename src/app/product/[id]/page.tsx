import Price from "@/components/Price";
import { featuredProducts, pizzas, pastas, burgers, singleProduct } from "@/data";
import Image from "next/image";
import React from "react";

type Props = {
  params: { id: string };
};

const SingleProductPage = ({ params }: Props) => {
  const id = Number(params.id);
  const allProducts = [
    ...featuredProducts,
    ...pizzas,
    ...pastas,
    ...burgers,
  ];

  const product = allProducts.find((p) => p.id === id) ?? singleProduct;

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center">
      {/* IMAGE CONTAINER */}
      {product.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image src={product.img} alt="" className="object-contain" fill />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">{product.title}</h1>
        <p>{product.desc}</p>
        <Price
          price={product.price}
          id={product.id}
          title={product.title}
          img={product.img}
          options={product.options}
        />
      </div>
    </div>
  );
};

export default SingleProductPage;
