function login() {
  const email = document.querySelector("input[placeholder='Email']").value;
  const password = document.querySelector("input[placeholder='Password']").value;

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  // TEMP: frontend auth simulation
  localStorage.setItem("user", JSON.stringify({ email }));
  window.location.href = "dashboard.html";
}
