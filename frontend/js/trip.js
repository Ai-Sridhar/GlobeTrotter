function goNext() {
  const name = document.querySelector("input[placeholder='Trip Name']").value;
  const start = document.querySelector("input[type='date']").value;

  if (!name || !start) {
    alert("Trip name and date required");
    return;
  }

  const trip = {
    name,
    createdAt: new Date().toISOString(),
    stops: []
  };

  localStorage.setItem("currentTrip", JSON.stringify(trip));
  window.location.href = "itinerary-builder.html";
}
