const trip = JSON.parse(localStorage.getItem("currentTrip"));

function renderCalendar() {
  const container = document.querySelector(".container");
  trip.stops.forEach(s => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = `${s.city}: ${s.start} → ${s.end}`;
    container.appendChild(div);
  });
}

renderCalendar();
