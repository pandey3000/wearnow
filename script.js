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

document.querySelector('.login-btn').onclick = function() {
  document.getElementById('loginOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
};

document.getElementById('loginClose').onclick = function() {
  document.getElementById('loginOverlay').classList.remove('active');
  document.body.style.overflow = '';
};

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
  popup.innerHTML = `<strong>Login successful</strong><br>Welcome admin<br><br>
    <button style="margin-top:1rem;padding:0.5rem 1.2rem;border-radius:22px;background:#ff4d6d;color:#fff;border:none;cursor:pointer;">OK</button>`;

  popup.querySelector('button').onclick = function() {
    document.body.removeChild(overlay);
  };

  if (username === 'admin' && password === 'shubham123') {
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


