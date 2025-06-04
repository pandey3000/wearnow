// You can fetch real product data from an API or use static data
const products = {
  fabindia: [
    { id: 1, name: "Cotton Shirt", price: 599, category: "Shirts", image: "./assets/products/shirt1.jpg" },
    { id: 2, name: "Linen Shirt", price: 1099, category: "Shirts", image: "./assets/products/shirt2.jpg" },
    // Add more products
  ]
};

// Get store name from URL
const urlParams = new URLSearchParams(window.location.search);
const storeName = urlParams.get('store');

// Load products for the store
function loadProducts() {
  const productList = document.querySelector('.product-list');
  productList.innerHTML = '';
  
  products[storeName].forEach(product => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;
  });
}

// Initialize
if (storeName && products[storeName]) {
  document.querySelector('h1').textContent = storeName;
  loadProducts();
} else {
  // Redirect if no valid store
  window.location.href = 'index.html';
}