const sidebar = document.getElementById('categorySidebar');
const toggleBtn = document.getElementById('sidebarToggle');
const overlay = document.getElementById('sidebarOverlay');

// Sidebar functions
function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Store navigation functionality
function setupStoreNavigation() {
  document.querySelectorAll('.store-card[data-store]').forEach(card => {
    card.addEventListener('click', function() {
      const store = card.getAttribute('data-store');
      if (store) {
        window.location.href = `product.html?store=${store}`;
      }
    });
  });
}

// Login overlay functions
function setupLoginOverlay() {
  const loginOverlay = document.getElementById('loginOverlay');
  
  document.querySelector('.login-btn').addEventListener('click', function(e) {
    e.preventDefault();
    loginOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  document.getElementById('loginClose').addEventListener('click', function() {
    loginOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// Store sidebar toggle (for full page view)
function setupStoreSidebar() {
  const storeSidebarToggle = document.getElementById('storeSidebarToggle');
  if (storeSidebarToggle) {
    storeSidebarToggle.addEventListener('click', function() {
      document.querySelector('.store-sidebar').classList.toggle('show-categories');
    });
  }
}

// Mobile sidebar toggle
function setupMobileSidebar() {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const categorySidebar = document.getElementById('categorySidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  if (sidebarToggle && categorySidebar && sidebarOverlay) {
    sidebarToggle.addEventListener('click', function() {
      categorySidebar.classList.add('open');
      sidebarOverlay.style.display = 'block';
      sidebarToggle.style.display = 'none';
    });

    sidebarOverlay.addEventListener('click', function() {
      categorySidebar.classList.remove('open');
      sidebarOverlay.style.display = 'none';
      sidebarToggle.style.display = '';
    });
  }
}

// Window resize handler
function handleResize() {
  if (window.innerWidth >= 900) {
    closeSidebar();
  }
}

// Escape key handler
function handleEscapeKey(e) {
  if (e.key === "Escape") {
    // Close login overlay
    document.getElementById('loginOverlay').classList.remove('active');
    document.body.style.overflow = '';
    
    // Close mobile sidebar
    if (categorySidebar.classList.contains('open')) {
      categorySidebar.classList.remove('open');
      sidebarOverlay.style.display = 'none';
      sidebarToggle.style.display = '';
    }
  }
}

// Initialize all functionality
function init() {
  toggleBtn.addEventListener('click', openSidebar);
  overlay.addEventListener('click', closeSidebar);
  window.addEventListener('resize', handleResize);
  window.addEventListener('keydown', handleEscapeKey);
  
  setupStoreNavigation();
  setupLoginOverlay();
  setupStoreSidebar();
  setupMobileSidebar();
}

// Start the application
document.addEventListener('DOMContentLoaded', init);

// Add this script after your existing login modal JS

document.querySelector('.login-btn').onclick = function() {
  document.getElementById('loginOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
};

document.getElementById('loginClose').onclick = function() {
  document.getElementById('loginOverlay').classList.remove('active');
  document.body.style.overflow = '';
};

// Add global variable to track logged-in user
let currentUser = null;

// Show user profile info and replace login button with username
function showUserProfile(username) {
  currentUser = username;
  // Replace login button with username
  const authLinks = document.querySelector('.auth-links');
  if (authLinks) {
    authLinks.innerHTML = `<div class="user-profile-btn" style="font-weight:600; color:#ff4d6d; cursor:pointer; margin-bottom:2rem"><i class="fas fa-user"></i> ${username.charAt(0).toUpperCase() + username.slice(1)}</div>`;
  }

  // If profile section doesn't exist, create it
  

}

// Login form submit handler
document.querySelector('.login-form').onsubmit = function(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(0,0,0,0.35)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = 9999;

  const popup = document.createElement('div');
  popup.style.background = '#fff';
  popup.style.padding = '2rem 2.5rem';
  popup.style.borderRadius = '18px';
  popup.style.boxShadow = '0 4px 32px rgba(0,0,0,0.18)';
  popup.style.textAlign = 'center';
  popup.style.fontSize = '1.2rem';
  popup.style.color = '#333';

  // Check for admin or roshan
  if (
    (username === 'admin' && password === 'shubham123') ||
    (username === 'roshan' && password === 'roshan123')
  ) {
    const welcomeName = username.charAt(0).toUpperCase() + username.slice(1);
    popup.innerHTML = `<strong>Login successful</strong><br>Welcome ${welcomeName}<br><br>
      <button style="margin-top:1rem;padding:0.5rem 1.2rem;border-radius:22px;background:#ff4d6d;color:#fff;border:none;cursor:pointer;">OK</button>`;
    popup.querySelector('button').onclick = function() {
      document.body.removeChild(overlay);
      showUserProfile(username); // Show profile/dashboard after login
    };
    document.getElementById('loginOverlay').style.display = 'none';
    document.body.style.overflow = '';
    document.body.appendChild(overlay);
    overlay.appendChild(popup);
  } else {
    popup.innerHTML = `<strong style="color:#ff4d6d;">Invalid username or password</strong><br><br>
      <button style="margin-top:1rem;padding:0.5rem 1.2rem;border-radius:22px;background:#ff4d6d;color:#fff;border:none;cursor:pointer;">OK</button>`;
    popup.querySelector('button').onclick = function() {
      document.body.removeChild(overlay);
    };
    document.body.appendChild(overlay);
    overlay.appendChild(popup);
  }
};

// --- Sidebar and Dashboard Logic ---

// Show sidebar when user icon is clicked
document.body.addEventListener('click', function(e) {
  const userBtn = document.querySelector('.user-profile-btn');
  const sidebar = document.getElementById('profileSidebar');
  if (userBtn && userBtn.contains(e.target)) {
    sidebar.classList.add('active');
    document.getElementById('sidebarUsername').textContent = userBtn.textContent.trim();
  }
  // Close sidebar if click outside
  if (sidebar && sidebar.classList.contains('active') && !sidebar.contains(e.target) && !userBtn.contains(e.target)) {
    sidebar.classList.remove('active');
  }
});

// Close sidebar
document.getElementById('profileSidebarClose').onclick = function() {
  document.getElementById('profileSidebar').classList.remove('active');
};

// Show dashboard modal when Dashboard is clicked
document.getElementById('dashboardBtn').onclick = function() {
  document.getElementById('dashboardModal').classList.add('active');
  // Fill dashboard content based on user
  const username = document.getElementById('sidebarUsername').textContent.trim().toLowerCase();
  const dashboardContent = document.getElementById('dashboardContent');
  if (username === 'admin') {
    dashboardContent.innerHTML = `
      <span class="dashboard-modal-close" id="dashboardModalClose">&times;</span>
      <h2 style="color:#ff4d6d;">Admin Dashboard</h2>
      <div style="margin:1.5rem 0;">
        <div><b>Total Orders:</b> 124</div>
        <div><b>Pending Orders:</b> 8</div>
        <div><b>Delivered Orders:</b> 112</div>
        <div><b>Cancelled Orders:</b> 4</div>
        <div><b>Registered Users:</b> 57</div>
      </div>
    `;
  } else {
    dashboardContent.innerHTML = `
      <span class="dashboard-modal-close" id="dashboardModalClose">&times;</span>
      <h2 style="color:#ff4d6d;">Welcome, ${username.charAt(0).toUpperCase() + username.slice(1)}</h2>
      <div style="margin:1.5rem 0;">
        <div><b>Your Orders:</b> 5</div>
        <div><b>Pending:</b> 1</div>
        <div><b>Delivered:</b> 4</div>
      </div>
    `;
  }
  // Close modal handler
  document.getElementById('dashboardModalClose').onclick = function() {
    document.getElementById('dashboardModal').classList.remove('active');
  };
};

// Logout from sidebar
document.getElementById('logoutBtnSidebar').onclick = function() {
  document.querySelector('.auth-links').innerHTML =
    `<a href="#" class="login-btn"><i class="fas fa-user"></i> Sign In / Login</a>`;
  document.getElementById('profileSidebar').classList.remove('active');
  document.getElementById('dashboardModal').classList.remove('active');
  
  currentUser = null;
};


