
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const password = document.getElementById("password").value;

  // Password validation logic
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert("Password must be at least 8 characters long and contain at least one alphabet, one number, and one special character (@$!%*?&).");
    return;
  }

  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    password: password
  };

  try {
    const res = await fetch(`${API_BASE}/users/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (!res.ok) {
      alert(JSON.stringify(result.detail));
      return;
    }

    localStorage.clear();

    alert("Signup successful. Please login.");

    window.location.replace("login.html");

  } catch (err) {
    alert("Server not reachable");
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
