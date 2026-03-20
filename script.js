const productsData = [
  {name:'Pizza', category:'Món chính', price:120000, img:'https://images.unsplash.com/photo-1601924582970-9238bcb495d9'},
  {name:'Burger', category:'Ăn nhanh', price:65000, img:'https://images.unsplash.com/photo-1550547660-d9450f859349'},
  {name:'Cơm gà', category:'Món chính', price:45000, img:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d'},
  {name:'Trà sữa', category:'Đồ uống', price:30000, img:'https://images.unsplash.com/photo-1586190848861-99aa4a171e90'},
  {name:'Khoai tây', category:'Ăn nhanh', price:25000, img:'https://images.unsplash.com/photo-1606755962773-d324e0a13086'},
  {name:'Bánh kem', category:'Tráng miệng', price:90000, img:'https://images.unsplash.com/photo-1542826438-bd32f43d626f'}
];

let cart = [];
let total = 0;

/* HIỂN THỊ SẢN PHẨM */
function renderProducts(list){
  const container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <p>${p.price.toLocaleString()}đ</p>
        <button onclick="addToCart('${p.name}', ${p.price})">Thêm</button>
      </div>
    `;
  });
}

/* THÊM VÀO GIỎ */
function addToCart(name, price){
  cart.push({name, price});
  total += price;
  renderCart();
}

/* XÓA */
function removeItem(index){
  total -= cart[index].price;
  cart.splice(index, 1);
  renderCart();
}

/* RENDER GIỎ */
function renderCart(){
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  cart.forEach((item, index) => {
    cartDiv.innerHTML += `
      <div>
        <span>${item.name}</span>
        <button onclick="removeItem(${index})">X</button>
      </div>
    `;
  });

  document.getElementById("total").innerText =
    "Tổng: " + total.toLocaleString() + "đ";
}

/* THANH TOÁN */
function checkout(){
  if(cart.length === 0){
    alert("Giỏ hàng trống!");
    return;
  }

  alert("🎉 Đặt hàng thành công! Tổng: " + total.toLocaleString() + "đ");

  cart = [];
  total = 0;
  renderCart();
}

/* LỌC */
function filterCategory(category){
  if(category === "all"){
    renderProducts(productsData);
  } else {
    renderProducts(productsData.filter(p => p.category === category));
  }
}

/* LOAD BAN ĐẦU */
renderProducts(productsData);