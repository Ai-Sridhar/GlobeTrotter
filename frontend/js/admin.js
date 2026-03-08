const stats = {
  users: 120,
  trips: 340,
  cities: 45
};

const container = document.querySelector(".container");
container.innerHTML = `
  <div class="card">Users: ${stats.users}</div>
  <div class="card">Trips: ${stats.trips}</div>
  <div class="card">Cities: ${stats.cities}</div>
`;
