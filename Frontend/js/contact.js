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

    const userObjStr = localStorage.getItem("user");
    if (userObjStr) {
      try {
        const userObj = JSON.parse(userObjStr);
        const emailInput = document.getElementById("email");
        if (emailInput && userObj.email) {
          emailInput.value = userObj.email;
          emailInput.readOnly = true;
          emailInput.style.backgroundColor = "#e2e8f0";
          emailInput.style.cursor = "not-allowed";
        }
      } catch (e) {
        console.error("Error parsing user from localStorage");
      }
    }
  }


});

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user_id = localStorage.getItem("user_id");
  if (!user_id) {
    alert("Please login to send a message");
    window.location.href = "login.html";
    return;
  }

  let userName = "User";
  try {
    const userObjStr = localStorage.getItem("user");
    if (userObjStr) {
      const userObj = JSON.parse(userObjStr);
      if (userObj.name) userName = userObj.name;
    }
  } catch (e) {
    console.error("Error reading user name");
  }

  const data = {
    user_id: Number(user_id),
    name: userName,
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

