document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("user_id");
  if (userId) {
    document.getElementById("signupBtn").style.display = "none";
    document.getElementById("loginBtn").textContent = "Logout";
    document.getElementById("loginBtn").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.clear();
      window.location.href = "login.html";
    });
    document.getElementById("myPassesLink").style.display = "block";
    document.getElementById("profileLink").style.display = "block";
  }
});

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user_id = localStorage.getItem("user_id") || 0;

  const data = {
    user_id: Number(user_id),
    name: document.getElementById("name").value,
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

