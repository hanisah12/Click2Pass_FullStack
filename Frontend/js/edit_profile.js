const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = "login.html";
}
document.getElementById("name").value = user.name;
document.getElementById("phone").value = user.phone;


const userNameEl = document.getElementById("userName");
if (userNameEl) {
  userNameEl.textContent = user.name;
}

document.getElementById("editProfileForm").addEventListener("submit", async e => {
  e.preventDefault();

  const user_id = localStorage.getItem("user_id");

  const data = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value
  };

  const newPassword = document.getElementById("password").value;
  if (newPassword) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      alert("Password must be at least 8 characters long and contain at least one alphabet, one number, and one special character (@$!%*?&).");
      return;
    }
    data.password = newPassword;
  }

  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/users/${user_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const errorData = await res.json();
    alert("Update failed: " + (errorData.detail || "Unknown error"));
    return;
  }

  const updatedUser = await res.json();
  const currentToken = localStorage.getItem("token");
  // Keep the token if it's not in the update response
  if (!updatedUser.token && currentToken) {
    updatedUser.token = currentToken;
  }
  localStorage.setItem("user", JSON.stringify(updatedUser));
  localStorage.setItem("user_id", updatedUser.user_id);

  alert("Profile updated successfully!");
  window.location.href = "profile.html";
});

// Password Visibility Toggle
const togglePassword = document.querySelector("#togglePassword");
const passwordInput = document.querySelector("#password");

if (passwordInput) {
  passwordInput.addEventListener("input", function () {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (this.value === "" || passwordRegex.test(this.value)) {
      this.style.borderColor = (this.value === "") ? "" : "green";
      this.style.boxShadow = (this.value === "") ? "" : "0 0 5px green";
    } else {
      this.style.borderColor = "";
      this.style.boxShadow = "";
    }
  });
}

if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", function () {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  });
}


// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}
