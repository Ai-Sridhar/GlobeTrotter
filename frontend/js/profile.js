const user = JSON.parse(localStorage.getItem("user"));

document.querySelectorAll("input")[1].value = user?.email || "";

function updateProfile() {
  alert("Profile updated (frontend)");
}
