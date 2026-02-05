const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = "../pages/login.html";
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
  localStorage.setItem("user", JSON.stringify(updatedUser));

  alert("Profile updated successfully!");
  window.location.href = "../pages/profile.html";
});
