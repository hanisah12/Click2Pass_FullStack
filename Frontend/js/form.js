document.getElementById("apply-pass-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user_id = localStorage.getItem("user_id");
  if (!user_id) {
    alert("Login required");
    return;
  }

  const data = {
    user_id: Number(user_id),
    pass_type: document.querySelector("input[name='pass_type']:checked").value,
    id_proof: document.getElementById("id-proof").value,
    valid_from: document.getElementById("valid-from").value,
    valid_till: document.getElementById("valid-till").value
  };

  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/passes/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    alert(result.detail);
    return;
  }


  localStorage.setItem("last_pass", JSON.stringify(result));

  window.location.href = "success.html";
});


const today = new Date().toISOString().split("T")[0];
const validFrom = document.getElementById("valid-from");
const validTill = document.getElementById("valid-till");
const idProofInput = document.getElementById("id-proof");

validFrom.min = today;
validTill.min = today;

// Fetch existing pass to pre-fill Aadhaar number if it exists
document.addEventListener("DOMContentLoaded", async () => {
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  if (user_id && token) {
    try {
      const res = await fetch(`${API_BASE}/passes/user/${user_id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        const passes = await res.json();
        if (passes.length > 0) {
          // Use the Aadhaar from the most recent pass
          const latestPass = passes[passes.length - 1];
          idProofInput.value = latestPass.id_proof;
          idProofInput.readOnly = true;
          idProofInput.classList.add("readonly-input");

          // Add a help message
          const helpText = document.createElement("small");
          helpText.innerText = "Aadhaar number is locked to your previous record.";
          helpText.style.color = "#666";
          helpText.style.display = "block";
          helpText.style.marginTop = "5px";
          idProofInput.parentNode.appendChild(helpText);
        }
      }
    } catch (err) {
      console.error("Error fetching previous passes:", err);
    }
  }
});

validFrom.addEventListener("change", () => {
  const fromDate = new Date(validFrom.value);
  if (!isNaN(fromDate.getTime())) {

    const tillDate = new Date(fromDate);
    tillDate.setMonth(tillDate.getMonth() + 1);


    const yyyy = tillDate.getFullYear();
    const mm = String(tillDate.getMonth() + 1).padStart(2, '0');
    const dd = String(tillDate.getDate()).padStart(2, '0');

    validTill.value = `${yyyy}-${mm}-${dd}`;
    validTill.min = validFrom.value;
  }
});
