const sharedTrips = [
  "Paris in 5 Days",
  "Japan Explorer",
  "Budget Thailand Trip"
];

const container = document.querySelector(".container");
sharedTrips.forEach(t => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerText = t;
  container.appendChild(div);
});
