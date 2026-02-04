
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    password: document.getElementById("password").value
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
