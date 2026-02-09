const passData = JSON.parse(localStorage.getItem("last_pass"));

if (!passData) {
  document.querySelector(".form-subtitle").innerHTML =
    "Pass created successfully.<br>View details in <strong>My Passes</strong>.";
} else {
  const displayType = passData.pass_type === "1000" ? "₹1000 - Non-AC" : "₹2000 - AC + Non-AC";
  document.getElementById("passType").textContent = displayType;
  document.getElementById("passId").textContent = "P-" + passData.pass_id;
  document.getElementById("validFrom").textContent = formatDate(passData.valid_from);
  document.getElementById("validTill").textContent = formatDate(passData.valid_till);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const fromDate = new Date(passData.valid_from);
  fromDate.setHours(0, 0, 0, 0);
  const tillDate = new Date(passData.valid_till);
  tillDate.setHours(0, 0, 0, 0);

  let diffDays;
  if (today < fromDate) {
    const diffTime = tillDate - fromDate;
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } else {
    const diffTime = tillDate - today;
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

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
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
