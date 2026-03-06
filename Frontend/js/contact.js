document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("user_id");
  const signupBtn = document.getElementById("signupBtn");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const applyPassLink = document.getElementById("applyPassLink");
  const myPassesLink = document.getElementById("myPassesLink");
  const profileLink = document.getElementById("profileLink");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (userId) {
    if (signupBtn) signupBtn.style.display = "none";
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) {
      logoutBtn.style.display = "block";
      logoutBtn.addEventListener("click", () => {
        localStorage.clear();
        window.location.reload();
      });
    }
    if (applyPassLink) applyPassLink.style.display = "block";
    if (myPassesLink) myPassesLink.style.display = "block";
    if (profileLink) profileLink.style.display = "block";
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
});

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user_id = localStorage.getItem("user_id") || 0;

  const data = {
    user_id: Number(user_id),
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  };

  try {
    const res = await fetch(`${API_BASE}/messages/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      alert("Failed to send message");
      return;
    }

    alert("Message sent successfully!");
    document.querySelector("form").reset();

  } catch (err) {
    alert("Server not reachable");
  }
});

