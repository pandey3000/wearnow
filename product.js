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

  // Attach event listeners to new Add to Cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = btn.closest('.product-card');
      const name = card.querySelector('.product-name').textContent;
      const price = card.querySelector('.product-price').textContent;
      const img = card.querySelector('.product-image').src;
      let cart = getCart();
      cart.push({ name, price, img });
      setCart(cart);

      // Show "View Cart" button if not already present
      if (!document.getElementById('viewCartBtn')) {
        const viewCartBtn = document.createElement('button');
        viewCartBtn.id = 'viewCartBtn';
        viewCartBtn.textContent = 'View Cart';
        viewCartBtn.style.cssText = `
          display:block;margin:2rem auto 0 auto;padding:0.8rem 2.2rem;
          background:#ff4d6d;color:#fff;border:none;border-radius:22px;
          font-size:1.1rem;font-weight:600;cursor:pointer;box-shadow:0 2px 12px rgba(0,0,0,0.08);
        `;
        viewCartBtn.onclick = showCartOverlay;
        document.querySelector('.products-section').appendChild(viewCartBtn);
      }
    });
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

// Simple cart logic for product.html

// Store cart in localStorage for persistence
function getCart() {
  return JSON.parse(localStorage.getItem('wearnow_cart') || '[]');
}
function setCart(cart) {
  localStorage.setItem('wearnow_cart', JSON.stringify(cart));
}

// Add to cart handler
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', function() {
    const card = btn.closest('.product-card');
    const name = card.querySelector('.product-name').textContent;
    const price = card.querySelector('.product-price').textContent;
    const img = card.querySelector('.product-image').src;
    let cart = getCart();
    cart.push({ name, price, img });
    setCart(cart);

    // Show "View Cart" button if not already present
    if (!document.getElementById('viewCartBtn')) {
      const viewCartBtn = document.createElement('button');
      viewCartBtn.id = 'viewCartBtn';
      viewCartBtn.textContent = 'View Cart';
      viewCartBtn.style.cssText = `
        display:block;margin:2rem auto 0 auto;padding:0.8rem 2.2rem;
        background:#ff4d6d;color:#fff;border:none;border-radius:22px;
        font-size:1.1rem;font-weight:600;cursor:pointer;box-shadow:0 2px 12px rgba(0,0,0,0.08);
      `;
      viewCartBtn.onclick = showCartOverlay;
      document.querySelector('.products-section').appendChild(viewCartBtn);
    }
  });
});

// Show cart overlay
function showCartOverlay() {
  const cart = getCart();
  const overlay = document.createElement('div');
  overlay.id = 'cartOverlay';
  overlay.style.cssText = `
    position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;
    background:#fff;display:flex;flex-direction:column;align-items:center;overflow:auto;
  `;

  const closeBtn = document.createElement('span');
  closeBtn.textContent = '×';
  closeBtn.style.cssText = `
    position:absolute;top:1.5rem;right:2rem;font-size:2.5rem;color:#ff4d6d;cursor:pointer;font-weight:700;
  `;
  closeBtn.onclick = () => overlay.remove();

  const title = document.createElement('h2');
  title.textContent = 'Your Cart';
  title.style.cssText = 'margin:2.5rem 0 1.5rem 0;color:#ff4d6d;';

  const cartList = document.createElement('div');
  cartList.style.cssText = 'width:100%;max-width:500px;display:flex;flex-direction:column;gap:1.2rem;';

  let total = 0;

  if (cart.length === 0) {
    cartList.innerHTML = '<div style="text-align:center;color:#888;">Your cart is empty.</div>';
  } else {
    cart.forEach((item, idx) => {
      // Extract numeric price (remove ₹ and commas)
      const priceNum = parseFloat(item.price.replace(/[^\d.]/g, ''));
      total += priceNum;

      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:1rem;background:#fafafa;padding:1rem 1.2rem;border-radius:12px;position:relative;';
      row.innerHTML = `
        <img src="${item.img}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;">
        <div style="flex:1;">
          <div style="font-weight:600;">${item.name}</div>
          <div style="color:#ff4d6d;">${item.price}</div>
        </div>
        <button class="remove-cart-item" data-idx="${idx}" style="
          background:#ff4d6d;border:none;color:#fff;border-radius:50%;width:32px;height:32px;
          font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;
        " title="Remove from cart">&times;</button>
      `;
      cartList.appendChild(row);
    });

    // Show total price
    const totalDiv = document.createElement('div');
    totalDiv.style.cssText = 'margin:2rem 0 0 0;font-size:1.2rem;font-weight:700;text-align:right;color:#222;';
    totalDiv.innerHTML = `Total: <span style="color:#ff4d6d;">₹${total.toFixed(2)}</span>`;
    cartList.appendChild(totalDiv);

    // Payment Section
    const paySection = document.createElement('div');
    paySection.style.cssText = 'margin:2.5rem 0 1.5rem 0;padding:1.5rem 1rem;background:#f8f8f8;border-radius:14px;box-shadow:0 2px 12px rgba(0,0,0,0.06);';
    paySection.innerHTML = `
      <h3 style="margin-bottom:1rem;color:#222;font-weight:700;">Choose Payment Option</h3>
      <div style="display:flex;flex-direction:column;gap:1.2rem;align-items:flex-start;">
        <label style="font-size:1.08rem;font-weight:600;display:flex;align-items:center;gap:0.7rem;">
          <input type="radio" name="payment" value="cod" checked style="margin-right:0.7rem;">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Cash" style="width:32px;height:32px;object-fit:contain;">
          Cash on Delivery
        </label>
        <label style="font-size:1.08rem;font-weight:600;display:flex;align-items:center;gap:0.7rem;">
          <input type="radio" name="payment" value="phonepe" style="margin-right:0.7rem;">
          <img src="https://seeklogo.com/images/P/phonepe-logo-0F6E8CE652-seeklogo.com.png" alt="PhonePe" style="width:32px;height:32px;object-fit:contain;">
          PhonePe
        </label>
        <label style="font-size:1.08rem;font-weight:600;display:flex;align-items:center;gap:0.7rem;">
          <input type="radio" name="payment" value="googlepay" style="margin-right:0.7rem;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Google_Pay_Logo.svg" alt="Google Pay" style="width:32px;height:32px;object-fit:contain;background:#fff;border-radius:6px;">
          Google Pay
        </label>
      </div>
      <button id="payNowBtn" style="
        margin-top:2rem;padding:0.8rem 2.2rem;background:#ff4d6d;color:#fff;
        border:none;border-radius:22px;font-size:1.1rem;font-weight:700;cursor:pointer;
        box-shadow:0 2px 12px rgba(0,0,0,0.08);
        letter-spacing:0.5px;
      "><i class="fas fa-credit-card" style="margin-right:0.7rem;"></i>Pay Now</button>
    `;
    cartList.appendChild(paySection);

    // Pay Now button handler
    setTimeout(() => {
      const payNowBtn = document.getElementById('payNowBtn');
      if (payNowBtn) {
        payNowBtn.onclick = function() {
          const paymentType = overlay.querySelector('input[name="payment"]:checked').value;
          overlay.remove();
          setCart([]); // Clear cart
          // Optionally, remove the View Cart button if cart is empty
          const viewCartBtn = document.getElementById('viewCartBtn');
          if (viewCartBtn) viewCartBtn.remove();

          // Show order placed message on main page
          showOrderPlacedMessage(paymentType, total);
        };
      }
    }, 0);
  }

  overlay.appendChild(closeBtn);
  overlay.appendChild(title);
  overlay.appendChild(cartList);
  document.body.appendChild(overlay);

  // Remove item handler
  cartList.querySelectorAll('.remove-cart-item').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(btn.getAttribute('data-idx'));
      let cart = getCart();
      cart.splice(idx, 1);
      setCart(cart);
      overlay.remove();
      showCartOverlay();
    };
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

function showOrderPlacedMessage(paymentType, total) {
  // Remove any existing message
  const oldMsg = document.getElementById('orderPlacedMsg');
  if (oldMsg) oldMsg.remove();

  const msg = document.createElement('div');
  msg.id = 'orderPlacedMsg';
  msg.style.cssText = `
    position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;
    background:rgba(255,255,255,0.98);display:flex;align-items:center;justify-content:center;
  `;

  msg.innerHTML = `
    <div style="
      background:#fff;
      border-radius:18px;
      box-shadow:0 4px 32px rgba(0,0,0,0.12);
      padding:2.5rem 2.5rem 2rem 2.5rem;
      text-align:center;
      max-width:90vw;
      min-width:320px;
      color:#222;
      font-family:'Montserrat',sans-serif;
      position:relative;
    ">
      <span id="closeOrderMsg" style="
        position:absolute;top:1.2rem;right:1.5rem;font-size:2rem;color:#ff4d6d;cursor:pointer;font-weight:700;
      ">&times;</span>
      <div style="font-size:2.5rem;margin-bottom:1rem;">🎉</div>
      <h2 style="color:#ff4d6d;margin-bottom:0.7rem;">Order Placed Successfully!</h2>
      <div style="font-size:1.15rem;margin-bottom:1.2rem;">
        <b>Payment method:</b> ${
          paymentType === 'cod' ? 'Cash on Delivery' :
          paymentType === 'phonepe' ? 'PhonePe' : 'Google Pay'
        }<br>
        <b>Total:</b> <span style="color:#ff4d6d;">₹${total.toFixed(2)}</span>
      </div>
      <button id="orderMsgOkBtn" style="
        margin-top:1rem;padding:0.7rem 2.2rem;background:#ff4d6d;color:#fff;
        border:none;border-radius:22px;font-size:1.1rem;font-weight:700;cursor:pointer;
        box-shadow:0 2px 12px rgba(0,0,0,0.08);
        letter-spacing:0.5px;
      ">OK</button>
    </div>
  `;

  document.body.appendChild(msg);

  document.getElementById('closeOrderMsg').onclick =
    document.getElementById('orderMsgOkBtn').onclick = function() {
      msg.remove();
    };
}