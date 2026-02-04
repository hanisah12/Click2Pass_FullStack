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
    alert("Server not reachable");
  }
});
