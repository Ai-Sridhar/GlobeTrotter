const cities = [
  { name: "Paris", country: "France", cost: "High" },
  { name: "Tokyo", country: "Japan", cost: "High" },
  { name: "Bangkok", country: "Thailand", cost: "Low" }
];

function searchCity() {
  const q = document.querySelector("input").value.toLowerCase();
  const results = cities.filter(c => c.name.toLowerCase().includes(q));
  const container = document.querySelector(".container");

  container.innerHTML = "";
  results.forEach(c => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = `${c.name}, ${c.country} (${c.cost})`;
    container.appendChild(div);
  });
}
