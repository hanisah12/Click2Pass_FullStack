const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "login.html";
}

document.getElementById("profileName").value = user.name;
document.getElementById("profileEmail").value = user.email;
document.getElementById("profilePhone").value = user.phone;

const userNameEl = document.getElementById("userName");
if (userNameEl) {
  userNameEl.textContent = user.name;
}
