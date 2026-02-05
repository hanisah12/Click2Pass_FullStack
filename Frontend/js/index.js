document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signupBtn");
  const loginBtn = document.getElementById("loginBtn");
  const applyPassBtn = document.getElementById("applyPassBtn");
  const createAccountBtn = document.getElementById("createAccountBtn");

  const userId = localStorage.getItem("user_id");


  if (userId) {
    if (loginBtn) {
      loginBtn.textContent = "My Profile";
      loginBtn.addEventListener("click", () => {
        window.location.href = "../pages/profile.html";
      });
    }
    if (signupBtn) {
      signupBtn.textContent = "My Passes";
      signupBtn.classList.remove("btn-signup");
      signupBtn.addEventListener("click", () => {
        window.location.href = "../pages/my-passes.html";
      });
    }
    if (createAccountBtn) {
      createAccountBtn.textContent = "Apply for Pass";
      createAccountBtn.addEventListener("click", () => {
        window.location.href = "../pages/form.html";
      });
    }
  } else {
   
    if (signupBtn) {
      signupBtn.addEventListener("click", () => {
        window.location.href = "../pages/signup.html";
      });
    }

  
    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        window.location.href = "../pages/login.html";
      });
    }


    if (createAccountBtn) {
      createAccountBtn.addEventListener("click", () => {
        window.location.href = "../pages/signup.html";
      });
    }
  }


  if (applyPassBtn) {
    applyPassBtn.addEventListener("click", () => {
      if (userId) {

        window.location.href = "../pages/form.html";
      } else {

        window.location.href = "../pages/login.html";
      }
    });
  }
});
