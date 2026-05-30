type Product = {
  id: number;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
};

type Products = Product[];

export const featuredProducts: Products = [
  {
    id: 1,
    title: "Pizza Sicilian",
    desc: "Kích thích vị giác với sự kết hợp cay nồng của pepperoni, jalapeños, ớt bột và mozzarella tan chảy.",
    img: "/temporary/p1.png",
    price: 249,
    options: [
      {
        title: "Nhỏ",
        additionalPrice: 0,
      },
      {
        title: "Vừa",
        additionalPrice: 10,
      },
      {
        title: "Lớn",
        additionalPrice: 20,
      },
    ],
  },
  {
    id: 2,
    title: "Bacon Deluxe",
    desc: "Thưởng thức bánh burger thịt bò nướng thơm, bacon giòn, phô mai cheddar và sốt BBQ đậm đà.",
    img: "/temporary/p2.png",
    price: 70,
    options: [
      {
        title: "Nhỏ",
        additionalPrice: 0,
      },
      {
        title: "Vừa",
        additionalPrice: 10,
      },
      {
        title: "Lớn",
        additionalPrice: 20,
      },
    ],
  },
  {
    id: 3,
    title: "Bella Napoli",
    desc: "Pizza Ý cổ điển với đế giòn, sốt cà chua chua ngọt, mozzarella tươi và thảo mộc thơm ngon.",
    img: "/temporary/p3.png",
    price: 249,
    options: [
      {
        title: "Nhỏ",
        additionalPrice: 0,
      },
      {
        title: "Vừa",
        additionalPrice: 10,
      },
      {
        title: "Lớn",
        additionalPrice: 20,
      },
    ],
  },
  {
    id: 4,
    title: "Spicy Arrabbiata",
    desc: "Mỳ penne sốt cà chua cay ấm nồng, kết hợp tỏi, ớt và húng quế tươi.",
    img: "/temporary/p8.png",
    price: 269,
    options: [
      {
        title: "Nhỏ",
        additionalPrice: 0,
      },
      {
        title: "Vừa",
        additionalPrice: 10,
      },
      {
        title: "Lớn",
        additionalPrice: 20,
      },
    ],
  },
  {
    id: 5,
    title: "Jalapeño Fiesta",
    desc: "Burger đậm vị với patty bò, jalapeños cay, phô mai pepper jack và sốt chipotle béo cay.",
    img: "/temporary/p5.png",
    price: 70,
    options: [
      {
        title: "Nhỏ",
          additionalPrice: 0,
      },
      {
        title: "Vừa",
          additionalPrice: 10,
      },
      {
        title: "Lớn",
          additionalPrice: 20,
      },
    ],
  },
  {
    id: 6,
    title: "Margherita Magic",
    desc: "Pizza truyền thống với cà chua ngọt, basil tươi, mozzarella kem và dầu oliu nguyên chất.",
    img: "/temporary/p6.png",
    price: 249,
    options: [
      {
        title: "Nhỏ",
          additionalPrice: 0,
      },
      {
        title: "Vừa",
          additionalPrice: 10,
      },
      {
        title: "Lớn",
          additionalPrice: 20,
      },
    ],
  },
  {
    id: 7,
    title: "Garlic Parmesan Linguine",
    desc: "Mỳ linguine sốt kem Parmesan, tỏi thơm và trang trí bằng ngò tây, ớt chuông và cà chua bi.",
    img: "/temporary/p7.png",
    price: 289,
    options: [
      {
        title: "Nhỏ",
          additionalPrice: 0,
      },
      {
        title: "Vừa",
          additionalPrice: 10,
      },
      {
        title: "Lớn",
          additionalPrice: 20,
      },
    ],
  },
  {
    id: 8,
    title: "Mediterranean Delight",
    desc: "Khám phá vị Địa Trung Hải với phô mai feta, olive Kalamata, cà chua khô và oregano thơm.",
    img: "/temporary/p8.png",
    price: 329,
    options: [
      {
        title: "Nhỏ",
          additionalPrice: 0,
      },
      {
        title: "Vừa",
          additionalPrice: 10,
      },
      {
        title: "Lớn",
          additionalPrice: 20,
      },
    ],
  },
  {
    id: 9,
    title: "Hawaiian Teriyaki",
    desc: "Burger phong cách Hawaii với sốt teriyaki chua ngọt, dứa nướng, bacon giòn và rau xà lách tươi.",
    img: "/temporary/p9.png",
    price: 70,
    options: [
      {
        title: "Nhỏ",
          additionalPrice: 0,
      },
      {
        title: "Vừa",
          additionalPrice: 10,
      },
      {
        title: "Lớn",
          additionalPrice: 20,
      },
    ],
  },
];




export const pizzas: Products = [
  {
    id: 101,
    title: "Pizza Sicilian",
    desc: "Kích thích vị giác với sự kết hợp cay nồng của pepperoni, ớt bột và mozzarella tan chảy.",
    img: "/temporary/p1.png",
    price: 249,
    options: [
      {
        title: "Nhỏ",
          additionalPrice: 0,
      },
      {
        title: "Vừa",
          additionalPrice: 10,
      },
      {
        title: "Lớn",
          additionalPrice: 20,
      },
    ],
  },
  {
    id: 102,
    title: "Mediterranean Delight",
    desc: "Khám phá vị Địa Trung Hải với phô mai feta, olive Kalamata, cà chua khô và oregano thơm.",
    img: "/temporary/p8.png",
    price: 329,
    options: [
      {
        title: "Nhỏ",
          additionalPrice: 0,
      },
      {
        title: "Vừa",
          additionalPrice: 10,
      },
      {
        title: "Lớn",
          additionalPrice: 20,
      },
    ],
  },
  {
    id: 103,
    title: "Bella Napoli",
    desc: "Pizza Ý cổ điển với đế giòn, sốt cà chua chua ngọt, mozzarella tươi và thảo mộc thơm ngon.",
    img: "/temporary/p3.png",
    price: 269,
    options: [
      {
        title: "Nhỏ",
          additionalPrice: 0,
      },
      {
        title: "Vừa",
          additionalPrice: 10,
      },
      {
        title: "Lớn",
          additionalPrice: 20,
      },
    ],
  },
  {
    id: 104,
    title: "Pesto Primavera",
    desc: "Pizza phô mai với sốt pesto thơm, rau củ tươi và hương thảo dịu nhẹ.",
    img: "/temporary/p10.png",
    price: 289,
    options: [
      {
        title: "Nhỏ",
        additionalPrice: 0,
      },
      {
        title: "Vừa",
        additionalPrice: 10,
      },
      {
        title: "Lớn",
        additionalPrice: 20,
      },
    ],
  },
  {
    id: 105,
    title: "Veggie Supreme",
    desc: "Pizza rau củ đa dạng với cà chua, ớt, hành, nấm và phô mai béo.",
    img: "/temporary/p11.png",
    price: 249,
    options: [
      {
        title: "Nhỏ",
          additionalPrice: 0,
      },
      {
        title: "Vừa",
          additionalPrice: 10,
      },
      {
        title: "Lớn",
          additionalPrice: 20,
      },
    ],
  },
  {
    id: 106,
    title: "Four Cheese Fantasy",
    desc: "Thưởng thức sự hòa quyện của mozzarella, cheddar, provolone và Parmesan trong một chiếc pizza béo ngậy.",
    img: "/temporary/p12.png",
    price: 229,
    options: [
      {
        title: "Nhỏ",
          additionalPrice: 0,
      },
      {
        title: "Vừa",
          additionalPrice: 10,
      },
      {
        title: "Lớn",
          additionalPrice: 20,
      },
    ],
  },
];

export const pastas: Products = [
  {
    id: 201,
    title: "Spaghetti Carbonara",
    desc: "Mỳ spaghetti sốt kem trứng, thịt xông khói và phô mai Parmesan.",
    img: "/temporary/p14.png",
    price: 99,
    options: [
      {
        title: "Nhỏ",
          additionalPrice: 0,
      },
      {
        title: "Vừa",
          additionalPrice: 10,
      },
      {
        title: "Lớn",
          additionalPrice: 20,
      },
    ],
  },
  {
    id: 202,
    title: "Penne Arrabbiata",
    desc: "Mỳ penne sốt cà chua cay, tỏi thơm và lá basil.",
    img: "/temporary/p7.png",
    price: 99,
    options: [
      {
        title: "Nhỏ",
          additionalPrice: 0,
      },
      {
        title: "Vừa",
          additionalPrice: 10,
      },
      {
        title: "Lớn",
          additionalPrice: 20,
      },
    ],
  },
  {
    id: 203,
    title: "Fettuccine Alfredo",
    desc: "Mỳ fettuccine kem béo cùng Parmesan và tiêu đen.",
    img: "/temporary/p13.png",
    price: 99,
    options: [
      {
        title: "Nhỏ",
          additionalPrice: 0,
      },
      {
        title: "Vừa",
          additionalPrice: 10,
      },
      {
        title: "Lớn",
          additionalPrice: 20,
      },
    ],
  },
];

export const burgers: Products = [
  {
    id: 301,
    title: "Classic Beef Burger",
    desc: "Burger thịt bò nướng, phô mai cheddar, xà lách và sốt đặc biệt.",
    img: "/temporary/p2.png",
    price: 70,
    options: [
      {
        title: "Size chuẩn",
        additionalPrice: 0,
      },
    ],
  },
  {
    id: 302,
    title: "Bacon Cheese Burger",
    desc: "Burger với bacon giòn, phô mai tan chảy và sốt BBQ đậm vị.",
    img: "/temporary/p5.png",
    price: 70,
    options: [
      {
        title: "Size chuẩn",
        additionalPrice: 0,
      },
    ],
  },
];

export const singleProduct: Product = {
  id: 1,
  title: "Pizza Sicilian",
  desc: "Kích thích vị giác với sự kết hợp cay nồng của pepperoni, ớt bột và mozzarella tan chảy.",
  img: "/temporary/p1.png",
  price: 249,
  options: [
    {
      title: "Nhỏ",
        additionalPrice: 0,
    },
    {
      title: "Vừa",
        additionalPrice: 10,
    },
    {
      title: "Lớn",
        additionalPrice: 20,
    },
  ],
};


type Menu = {
  id: number;
  slug: string;
  title: string;
  desc?: string;
  img?: string;
  color: string;
}[];

export const menu: Menu = [
  {
    id: 1,
    slug: "pastas",
    title: "Mỳ Ý",
    desc: "Thưởng thức mỳ Ý tươi ngon, hương vị chuẩn châu Âu, nấu thủ công tại nhà hàng.",
    img: "/temporary/m1.png",
    color: "white",
  },
  {
    id: 2,
    slug: "burgers",
    title: "Burger thơm ngậy",
    desc: "Burger ngon miệng với thịt tươi, phô mai đậm vị và topping hấp dẫn.",
    img: "/temporary/m2.png",
    color: "black",
  },
  {
    id: 3,
    slug: "pizzas",
    title: "Pizza phô mai",
    desc: "Pizza ngon với lớp phô mai kéo sợi, nhân đậm đà và vỏ giòn rụm.",
    img: "/temporary/m3.png",
    color: "white",
  },
];

