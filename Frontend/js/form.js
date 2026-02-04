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

validFrom.min = today;
validTill.min = today;

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
