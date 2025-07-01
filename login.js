import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";

let currentUser = null;

function showUserProfile(email) {
  currentUser = email;
  const authLinks = document.querySelector('.auth-links');
  if (authLinks) {
    authLinks.innerHTML = `<div class="user-profile-btn" style="font-weight:600; color:#ff4d6d; cursor:pointer; margin-bottom:2rem">
      <i class="fas fa-user"></i> ${email.split('@')[0]}
    </div>`;
  }
}

// Attach immediately since modules defer
const loginOverlay = document.getElementById('loginOverlay');
const loginBtn = document.querySelector('.login-btn');
const loginClose = document.getElementById('loginClose');

if (loginBtn && loginOverlay) {
  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    loginOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

if (loginClose && loginOverlay) {
  loginClose.addEventListener('click', function() {
    loginOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

window.addEventListener('keydown', function(e) {
  if (e.key === "Escape") {
    loginOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

const loginForm = document.querySelector('.login-form');
if (loginForm) {
  loginForm.onsubmit = function(e) {
    e.preventDefault();
    const email = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        showUserProfile(user.email);

        loginOverlay.classList.remove('active');
        document.body.style.overflow = '';

        alert(`Welcome ${user.email.split('@')[0]}!`);
      })
      .catch((error) => {
        alert("Invalid email or password");
      });
  };
}

// Sidebar & dashboard
document.body.addEventListener('click', function(e) {
  const userBtn = document.querySelector('.user-profile-btn');
  const sidebar = document.getElementById('profileSidebar');

  if (userBtn && userBtn.contains(e.target)) {
    sidebar.classList.add('active');
    document.getElementById('sidebarUsername').textContent = userBtn.textContent.trim();
  }

  if (sidebar && sidebar.classList.contains('active') &&
      !sidebar.contains(e.target) && !userBtn.contains(e.target)) {
    sidebar.classList.remove('active');
  }
});

document.getElementById('profileSidebarClose').onclick = function() {
  document.getElementById('profileSidebar').classList.remove('active');
};

document.getElementById('dashboardBtn').onclick = function() {
  document.getElementById('dashboardModal').classList.add('active');
  const username = document.getElementById('sidebarUsername').textContent.trim().toLowerCase();
  const dashboardContent = document.getElementById('dashboardContent');

  dashboardContent.innerHTML = `<span class="dashboard-modal-close" id="dashboardModalClose">&times;</span>
    <h2 style="color:#ff4d6d;">Welcome, ${username}</h2>
    <div style="margin:1.5rem 0;">
      <div><b>Your Orders:</b> 5</div>
      <div><b>Pending:</b> 1</div>
      <div><b>Delivered:</b> 4</div>
    </div>`;

  document.getElementById('dashboardModalClose').onclick = function() {
    document.getElementById('dashboardModal').classList.remove('active');
  };
};

document.getElementById('logoutBtnSidebar').onclick = function() {
  document.querySelector('.auth-links').innerHTML =
    `<a href="#" class="login-btn"><i class="fas fa-user"></i> Sign In / Login</a>`;
  document.getElementById('profileSidebar').classList.remove('active');
  document.getElementById('dashboardModal').classList.remove('active');
  currentUser = null;

  // Reattach listener for new login link
  document.querySelector('.login-btn').addEventListener('click', function(e) {
    e.preventDefault();
    loginOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
};
