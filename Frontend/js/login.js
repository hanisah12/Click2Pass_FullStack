document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();


  localStorage.clear();

  const data = {
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value
  };

  try {
    const res = await fetch(`${API_BASE}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    let user;
    const text = await res.text();
    try {
      user = JSON.parse(text);
    } catch (e) {
      console.error("Server returned non-JSON:", text);
      alert("Server Error (Non-JSON): " + text.substring(0, 100));
      return;
    }

    if (!res.ok) {
      alert(user.detail || "Login failed");
      return;
    }


    localStorage.setItem("user_id", user.user_id);
    localStorage.setItem("token", user.token);
    localStorage.setItem("user", JSON.stringify(user));


    window.location.replace("form.html");

  } catch (err) {
    console.error("Login Error:", err);
    alert("Server not reachable: " + err.message);
  }
});

// Password Visibility Toggle
const togglePassword = document.querySelector("#togglePassword");
const passwordInput = document.querySelector("#password");

passwordInput.addEventListener("input", function () {
  if (this.value.length >= 8) {
    this.style.borderColor = "green";
    this.style.boxShadow = "0 0 5px green";
  } else {
    this.style.borderColor = "";
    this.style.boxShadow = "";
  }
});

togglePassword.addEventListener("click", function () {
  // Toggle the type attribute
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // Toggle the icon
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});
// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}
