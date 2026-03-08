const tripData = JSON.parse(localStorage.getItem("currentTrip"));

function calculateBudget() {
  let total = 0;
  tripData.stops.forEach(s => {
    total += Number(s.budget || 0);
  });

  document.querySelector(".container").innerHTML = `
    <div class="card">Total Estimated Budget: ₹${total}</div>
  `;
}

calculateBudget();
