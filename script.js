const initialProducts = [
  { name: "Banana Shirt 1", price: "999.99", image: "images/Product 1.png" },
  { name: "Banana Shirt 2", price: "1099.50", image: "images/Product 2.png" },
  { name: "Banana Shirt 3", price: "875.00", image: "images/Product 3.png" },
  { name: "Banana Shirt 4", price: "1149.00", image: "images/Product 4.png" },
  { name: "Banana Shirt 5", price: "980.00", image: "images/Product 5.png" },
  { name: "Banana Shirt 6", price: "1020.00", image: "images/Product 6.png" },
  { name: "Banana Shirt 7", price: "895.25", image: "images/Product 7.png" },
  { name: "Banana Shirt 8", price: "1100.00", image: "images/Product 8.png" },
];

let currentMainProduct = initialProducts[0];
let productList = initialProducts.slice(1);

function renderProductList() {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  productList.forEach((p, i) => {
    const div = document.createElement("div");
    div.className =
      "product-card flex-shrink-0 min-w-[200px] snap-start bg-white rounded-md shadow p-2 hover:scale-105 transition cursor-pointer";
    div.innerHTML = `
        <img src="${p.image}" class="w-full h-52 object-cover rounded" alt="${p.name}" />
        <p class="text-center mt-2 text-sm">${p.name}</p>
      `;
    div.onclick = () => swapProduct(i);
    container.appendChild(div);
  });
}

function swapProduct(index) {
  const selected = productList[index];
  const previousMain = currentMainProduct;

  document.getElementById("main-product-name").textContent = selected.name;
  document.getElementById("unit-price").textContent = selected.price;
  document.getElementById("total-price").textContent = selected.price;
  document.getElementById("main-product-image").src = selected.image;

  document.getElementById("quantity").value = 1;
  document
    .querySelectorAll(".size-btn")
    .forEach((btn) => btn.classList.remove("active"));

  currentMainProduct = selected;
  productList.splice(index, 1);
  productList.unshift(previousMain);
  renderProductList();
}

function adjustQuantity(change) {
  const input = document.getElementById("quantity");
  let qty = Math.max(1, parseInt(input.value) + change);
  input.value = qty;

  const unitPrice = parseFloat(
    document.getElementById("unit-price").textContent
  );
  document.getElementById("total-price").textContent = (
    unitPrice * qty
  ).toFixed(2);
}

function selectSize(btn) {
  document
    .querySelectorAll(".size-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  toast.style.opacity = 1;

  setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => toast.classList.add("hidden"), 300);
  }, 2000);
}

function openModal() {
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("modal").classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal").classList.remove("flex");
  document.getElementById("modal").classList.add("hidden");
  document.body.style.overflow = "auto";
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("hidden");
  menu.classList.toggle("flex");
}

document.addEventListener("DOMContentLoaded", renderProductList);
