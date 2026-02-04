document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const passId = params.get("pass_id");

    const userId = localStorage.getItem("user_id");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!passId || !userId) {
        window.location.href = "my-passes.html";
        return;
    }

    if (user) {
        document.getElementById("userName").textContent = user.name;
        document.getElementById("userPhone").textContent = user.phone;
    }

    try {
        const res = await fetch(`${API_BASE}/passes/${passId}`);
        if (!res.ok) throw new Error("Pass not found");

        const pass = await res.json();

        if (pass.user_id != userId) {
            alert("Unauthorized access to this pass.");
            window.location.href = "my-passes.html";
            return;
        }

        const displayType = pass.pass_type === "1000" ? "₹1000 - Non-AC" : "₹2000 - AC + Non-AC";
        document.getElementById("passType").textContent = displayType;
        document.getElementById("passId").textContent = "P-" + pass.pass_id;
        document.getElementById("validFrom").textContent = formatDate(pass.valid_from);
        document.getElementById("validTill").textContent = formatDate(pass.valid_till);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tillDate = new Date(pass.valid_till);
        tillDate.setHours(0, 0, 0, 0);

        const diffTime = tillDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const daysElement = document.getElementById("daysRemaining");
        if (diffDays > 0) {
            daysElement.textContent = `${diffDays} Days`;
            daysElement.style.color = "#10b981"; 
        } else if (diffDays === 0) {
            daysElement.textContent = "Expires Today";
            daysElement.style.color = "#f59e0b";
        } else {
            daysElement.textContent = "Expired";
            daysElement.style.color = "#ef4444"; 
        }

    } catch (err) {
        console.error("Error fetching pass:", err);
        alert("Failed to load pass details. Please try again.");
        window.location.href = "my-passes.html";
    }
});

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
