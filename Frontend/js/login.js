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

    const user = await res.json();

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

togglePassword.addEventListener("click", function () {
  // Toggle the type attribute
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // Toggle the icon
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});
