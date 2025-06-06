const products = {
  fabindia: [
    { id: 1, name: "Cotton Shirt", price: 599, category: "Shirts", image: "./assets/products/shirt1.png" },
    { id: 2, name: "Linen Shirt", price: 1099, category: "Shirts", image: "./assets/products/shirt2.png" },
    { id: 3, name: "Formal Trousers", price: 899, category: "Trousers", image: "./assets/products/trousers1.jpg" },
    { id: 4, name: "Casual Trousers", price: 799, category: "Trousers", image: "./assets/products/trousers2.png" },
    { id: 5, name: "Silk Kurta", price: 1299, category: "Ethnic", image: "./assets/products/kurta1.png" },
    { id: 6, name: "Cotton Kurta", price: 999, category: "Ethnic", image: "./assets/products/kurta2.png" },
    { id: 7, name: "Leather Belt", price: 399, category: "Accessories", image: "./assets/products/belt1.jpg" },
    { id: 8, name: "Wool Scarf", price: 299, category: "Accessories", image: "./assets/products/scarf1.png" },
    { id: 9, name: "Printed Dupatta", price: 499, category: "Ethnic", image: "./assets/products/dupatta1.png" },
    { id: 10, name: "Classic Watch", price: 1599, category: "Accessories", image: "./assets/products/watch1.png" }
  ],
  manyavar: [
    { id: 1, name: "Designer Sherwani", price: 2999, category: "Ethnic", image: "./assets/products/manyavar_sherwani1.jpg" },
    { id: 2, name: "Kurta Pajama Set", price: 1499, category: "Ethnic", image: "./assets/products/manyavar_kurta1.jpg" },
    { id: 3, name: "Nehru Jacket", price: 1199, category: "Accessories", image: "./assets/products/manyavar_jacket1.jpg" },
    { id: 4, name: "Formal Shirt", price: 899, category: "Shirts", image: "./assets/products/manyavar_shirt1.jpg" }
  ],
  biba: [
    { id: 1, name: "Red Kurti", price: 799, category: "Ethnic", image: "./assets/products/biba_kurti1.jpg" },
    { id: 2, name: "Printed Palazzo", price: 699, category: "Trousers", image: "./assets/products/biba_palazzo1.jpg" },
    { id: 3, name: "Cotton Dupatta", price: 399, category: "Accessories", image: "./assets/products/biba_dupatta1.jpg" },
    { id: 4, name: "Blue Shirt", price: 899, category: "Shirts", image: "./assets/products/biba_shirt1.jpg" }
  ]
  // Add more stores as needed
};

// Get store name from URL
const urlParams = new URLSearchParams(window.location.search);
const storeName = urlParams.get('store');

// Load products for the store
function loadProducts(category = "All") {
  const productList = document.querySelector('.products-grid');
  productList.innerHTML = '';

  products[storeName]
    .filter(product => category === "All" || product.category === category)
    .forEach(product => {
      productList.innerHTML += `
        <div class="product-card">
          <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-image">
          </div>
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">₹${product.price}</p>
            <button class="add-to-cart">
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
          </div>
        </div>
      `;
    });
}

function renderCategories() {
  const categoriesContainer = document.querySelector('.categories-container');
  const storeProducts = products[storeName] || [];
  // Get unique categories
  const categories = Array.from(new Set(storeProducts.map(p => p.category)));
  categories.unshift("All"); // Add "All" at the start

  categoriesContainer.innerHTML = categories.map(cat =>
    `<button class="category-btn${cat === "All" ? " active" : ""}" data-category="${cat}">${cat}</button>`
  ).join('');

  // Add event listeners for filtering
  categoriesContainer.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      categoriesContainer.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      loadProducts(this.getAttribute('data-category'));
    });
  });
}

// Initialize
if (storeName && products[storeName]) {
  document.querySelector('h1').textContent = storeName.charAt(0).toUpperCase() + storeName.slice(1);
  renderCategories();
  loadProducts();
} else {
  // Redirect if no valid store
  window.location.href = 'index.html';
}