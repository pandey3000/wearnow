const sidebar = document.getElementById('categorySidebar');
const toggleBtn = document.getElementById('sidebarToggle');
const overlay = document.getElementById('sidebarOverlay');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

toggleBtn.addEventListener('click', openSidebar);
overlay.addEventListener('click', closeSidebar);

window.addEventListener('resize', () => {
  if (window.innerWidth >= 900) {
    closeSidebar();
  }
});

document.getElementById('storeSidebarToggle').onclick = function() {
  document.querySelector('.store-sidebar').classList.toggle('show-categories');
};

// Show login overlay
document.querySelector('.login-btn').onclick = function(e) {
  e.preventDefault();
  document.getElementById('loginOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
};

// Hide login overlay
document.getElementById('loginClose').onclick = function() {
  document.getElementById('loginOverlay').classList.remove('active');
  document.body.style.overflow = '';
};

// Optional: Hide overlay on Esc key
window.addEventListener('keydown', function(e) {
  if (e.key === "Escape") {
    document.getElementById('loginOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Sidebar toggle logic for mobile/tablet
const sidebarToggle = document.getElementById('sidebarToggle');
const categorySidebar = document.getElementById('categorySidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

sidebarToggle.addEventListener('click', function() {
  categorySidebar.classList.add('open');
  sidebarOverlay.style.display = 'block';
  sidebarToggle.style.display = 'none'; // Hide the toggle button
});

sidebarOverlay.addEventListener('click', function() {
  categorySidebar.classList.remove('open');
  sidebarOverlay.style.display = 'none';
  sidebarToggle.style.display = ''; // Show the toggle button again
});

// Optionally, close sidebar with Escape key
window.addEventListener('keydown', function(e) {
  if (e.key === "Escape" && categorySidebar.classList.contains('open')) {
    categorySidebar.classList.remove('open');
    sidebarOverlay.style.display = 'none';
    sidebarToggle.style.display = '';
  }
});
