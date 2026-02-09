const user_id = localStorage.getItem("user_id");
if (!user_id) {
  window.location.href = "login.html";
}

const token = localStorage.getItem("token");

fetch(`${API_BASE}/passes/user/${user_id}`, {
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(myPasses => {
    const container = document.getElementById("passesContainer");
    container.innerHTML = "";

    if (myPasses.length === 0) {
      container.innerHTML = "<p>No active passes</p>";
      return;
    }

    myPasses.forEach(p => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const fromDate = new Date(p.valid_from);
      fromDate.setHours(0, 0, 0, 0);
      const tillDate = new Date(p.valid_till);
      tillDate.setHours(0, 0, 0, 0);

      let diffDays;
      if (today < fromDate) {
        const diffTime = tillDate - fromDate;
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      } else {
        const diffTime = tillDate - today;
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }

      let statusText = "";
      let statusStyle = "";
      let cardClass = "ticket-card";

      if (diffDays > 0) {
        statusText = `${diffDays} Days Remaining`;
        statusStyle = "color: #10b981; font-weight: 700;";
      } else if (diffDays === 0) {
        statusText = "Expires Today";
        statusStyle = "color: #f59e0b; font-weight: 700;";
      } else {
        statusText = "Expired";
        statusStyle = "background: linear-gradient(135deg, #f44336, #e91e63); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 800;";
        cardClass += " expired";
      }

      container.innerHTML += `
        <div class="${cardClass}">

          <div class="ticket-main">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <h3>${p.pass_type === '1000' ? 'Non-AC' : 'AC + Non-AC'} Pass</h3>
              <span style="${statusStyle}">${statusText}</span>
            </div>

            <div class="details">
              <div>
                <p>Valid From</p>
                <strong>${p.valid_from}</strong>
              </div>
              <div>
                <p>Valid Until</p>
                <strong>${p.valid_till}</strong>
              </div>
            </div>

            <div class="ticket-actions">
              <a href="view-pass.html?pass_id=${p.pass_id}" class="btn-renew">
                View Pass 
              </a>
            </div>
          </div>

        </div>
      `;
    });
  })
  .catch(err => {
    console.error("Failed to load passes:", err);
  });
