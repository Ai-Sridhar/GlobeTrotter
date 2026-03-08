let trip = JSON.parse(localStorage.getItem("currentTrip")) || { stops: [] };

function addStop() {
  const inputs = document.querySelectorAll(".card input");
  const stop = {
    city: inputs[0].value,
    start: inputs[1].value,
    end: inputs[2].value,
    budget: inputs[3].value,
    activities: []
  };

  if (!stop.city || !stop.start || !stop.end) {
    alert("All stop fields required");
    return;
  }

  trip.stops.push(stop);
  localStorage.setItem("currentTrip", JSON.stringify(trip));
  renderStops();
}

function renderStops() {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  trip.stops.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <b>Stop ${i + 1}</b><br>
      ${s.city} (${s.start} → ${s.end})<br>
      Budget: ₹${s.budget}
    `;
    container.appendChild(div);
  });
}

function viewItinerary() {
  window.location.href = "itinerary-view.html";
}

renderStops();
