document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signupBtn");
  const loginBtn = document.getElementById("loginBtn");
  const applyPassBtn = document.getElementById("applyPassBtn");
  const createAccountBtn = document.getElementById("createAccountBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const myPassesItem = document.getElementById("myPassesItem");
  const profileItem = document.getElementById("profileItem");

  const userId = localStorage.getItem("user_id");

  const applyPassItem = document.getElementById("applyPassItem");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (userId) {
    // Logged in
    if (signupBtn) signupBtn.style.display = "none";
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) {
      logoutBtn.style.display = "block";
      logoutBtn.addEventListener("click", () => {
        localStorage.clear();
        window.location.reload();
      });
    }
    if (applyPassItem) applyPassItem.style.display = "block";
    if (myPassesItem) myPassesItem.style.display = "block";
    if (profileItem) profileItem.style.display = "block";

    if (createAccountBtn) {
      createAccountBtn.textContent = "Apply for Pass";
      createAccountBtn.addEventListener("click", () => {
        window.location.href = "./Frontend/pages/form.html";
      });
    }
  } else {
    // Logged out
    if (signupBtn) signupBtn.style.display = "block";
    if (loginBtn) loginBtn.style.display = "block";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (applyPassItem) applyPassItem.style.display = "none";
    if (myPassesItem) myPassesItem.style.display = "none";
    if (profileItem) profileItem.style.display = "none";

    if (signupBtn) {
      signupBtn.addEventListener("click", () => {
        window.location.href = "./Frontend/pages/signup.html";
      });
    }
    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        window.location.href = "./Frontend/pages/login.html";
      });
    }
    if (createAccountBtn) {
      createAccountBtn.addEventListener("click", () => {
        window.location.href = "./Frontend/pages/signup.html";
      });
    }
  }



  if (applyPassBtn) {
    applyPassBtn.addEventListener("click", () => {
      if (userId) {
        window.location.href = "./Frontend/pages/form.html";
      } else {
        window.location.href = "./Frontend/pages/login.html";
      }
    });
  }
});
