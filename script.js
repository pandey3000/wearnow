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
  document.querySelectorAll('.store-card').forEach(card => {
    card.addEventListener('click', function() {
      const storeName = this.getAttribute('data-store');
      if (storeName) {
        window.location.href = `product.html?store=${storeName}`;
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


