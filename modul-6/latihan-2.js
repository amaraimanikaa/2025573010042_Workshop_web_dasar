// 2. Daftar Produk Kaset Musik
const products = [
  {
    id: 1,
    name: "Midnight City - Vinyl",
    price: 250000,
    img: "https://i.pinimg.com/736x/e6/0c/b7/e60cb7d87f1239910d21d898d87aba55.jpg",
  },
  {
    id: 2,
    name: "Summer Vibes - Cassette",
    price: 150000,
    img: "https://i.pinimg.com/736x/43/0d/cf/430dcf57d2be2d35b91d70e7fe9bbe28.jpg",
  },
  {
    id: 3,
    name: "Neon Soul - CD",
    price: 120000,
    img: "https://i.pinimg.com/1200x/e7/b8/53/e7b853c4d1d9214131d3df8096ebe8a7.jpg",
  },
  {
    id: 4,
    name: "Retro Wave - Vinyl",
    price: 300000,
    img: "https://i.pinimg.com/736x/cf/44/fe/cf44fe5c9d125b847d82f353847efda4.jpg",
  },
  {
    id: 5,
    name: "Lo-fi Dreams - Tape",
    price: 175000,
    img: "https://i.pinimg.com/1200x/be/91/45/be914550bd356f1048e249faf51fcaa1.jpg",
  },
];

// 5. State Keranjang
let cart = [];

// Render Produk ke Layar
const productContainer = document.getElementById("product-container");
products.forEach((p) => {
  productContainer.innerHTML += `
        <div class="card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>Rp ${p.price.toLocaleString()}</p>
            <button class="btn-add" onclick="addToCart(${p.id})">Tambah ke Keranjang</button>
        </div>
    `;
});

// Fungsi Tambah ke Keranjang
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const exist = cart.find((item) => item.id === productId);

  if (exist) {
    exist.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

// Fungsi Ubah Jumlah (+ / -)
function changeQty(id, delta) {
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) deleteItem(id);
  }
  renderCart();
}

// Fungsi Hapus Item
function deleteItem(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

// 5. Render Ulang Tampilan Keranjang
function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");
  const cartCountEl = document.getElementById("cart-count");

  cartContainer.innerHTML = "";
  let total = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    totalItems += item.qty;

    cartContainer.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>@ Rp ${item.price.toLocaleString()}</small>
                </div>
                <div>
                    <button class="btn-qty" onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="btn-qty" onclick="changeQty(${item.id}, 1)">+</button>
                    <button class="btn-del" onclick="deleteItem(${item.id})">🗑️</button>
                </div>
            </div>
        `;
  });

  if (cart.length === 0) {
    cartContainer.innerHTML =
      '<p style="font-size: 0.8rem; color: #ccc;">Keranjang masih kosong...</p>';
  }

  totalPriceEl.innerText = total.toLocaleString();
  cartCountEl.innerText = totalItems;
}

// 6. Fitur Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Keranjang kamu kosong, yuk pilih kaset dulu!");
    return;
  }

  let summary = "--- RINGKASAN ORDER ---\n\n";
  cart.forEach((item) => {
    summary += `${item.name} x${item.qty} = Rp ${(item.price * item.qty).toLocaleString()}\n`;
  });
  summary += `\nTOTAL BAYAR: Rp ${document.getElementById("total-price").innerText}`;
  summary += "\n\nTerima kasih sudah belanja kaset kece! ✨";

  alert(summary);
  cart = []; // Kosongkan keranjang setelah checkout
  renderCart();
}


