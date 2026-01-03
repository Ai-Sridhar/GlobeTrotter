/* ---------------- Navigation ---------------- */
function go(page){
  window.location.href = page;
}

/* ---------------- Wishlist ---------------- */
let wishlist = [];

function addToWishlist(country){
  if(!wishlist.includes(country)){
    wishlist.push(country);
    renderWishlist();
  }
}

function renderWishlist(){
  const ul = document.getElementById("wishlist");
  ul.innerHTML = "";
  wishlist.forEach(c=>{
    const li = document.createElement("li");
    li.innerText = c;
    ul.appendChild(li);
  });
}

function like(btn){
  btn.innerText = "❤️ Liked";
}

/* ---------------- Community Data ---------------- */
// 20 countries sample
const countries = [
  {name:"India", price:20000, transport:["Air","Road"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"Andaman & Nicobar", price:30000, transport:["Air","Water"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"America", price:50000, transport:["Air"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"France", price:40000, transport:["Air"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"Japan", price:45000, transport:["Air"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"Australia", price:55000, transport:["Air"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"Italy", price:38000, transport:["Air"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"Egypt", price:25000, transport:["Air","Road"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"Thailand", price:22000, transport:["Air","Road"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"Brazil", price:50000, transport:["Air"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"Canada", price:47000, transport:["Air"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"China", price:35000, transport:["Air"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"UK", price:40000, transport:["Air"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"Spain", price:39000, transport:["Air"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"Russia", price:45000, transport:["Air"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"Germany", price:42000, transport:["Air"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"Dubai", price:30000, transport:["Air","Road"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"New Zealand", price:60000, transport:["Air"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"South Africa", price:48000, transport:["Air"], image:"placeholder.jpg", logo:"placeholder-logo.png"},
  {name:"Mexico", price:40000, transport:["Air"], image:"placeholder.jpg", logo:"placeholder-logo.png"}
];

/* ---------------- Render Community ---------------- */
function renderCommunity(data=countries){
  const grid = document.getElementById("placesGrid");
  if(!grid) return;
  grid.innerHTML = "";
  data.forEach(c=>{
    const div = document.createElement("div");
    div.className="trip-card";
    div.innerHTML = `
      <div class="image-container">
        <img src="${c.image}" class="country-image"/>
        <img src="${c.logo}" class="country-logo"/>
      </div>
      <h3>${c.name}</h3>
      <p>Price: ₹${c.price} • Transport: ${c.transport.join(", ")}</p>
      <div class="trip-actions">
        <button onclick="like(this)">❤️ Like</button>
        <button onclick="addToWishlist('${c.name}')">🔖 Wishlist</button>
        <button onclick="goToBooking('${c.name}')">📌 Book Now</button>
      </div>
    `;
    grid.appendChild(div);
  });
}

/* ---------------- Search, Filter, Sort ---------------- */
function searchCountry(){
  const query = document.getElementById("searchCountry").value.toLowerCase();
  let result = countries.filter(c => c.name.toLowerCase().includes(query));
  renderCommunity(result);
}

function applyFilters(){
  const query = document.getElementById("searchCountry").value.toLowerCase();
  let filtered = countries.filter(c => c.name.toLowerCase().includes(query));

  const transport = document.getElementById("filterTransport").value;
  if(transport!=="all") filtered = filtered.filter(c=>c.transport.includes(transport));

  const sortPrice = document.getElementById("sortPrice").value;
  if(sortPrice==="low") filtered.sort((a,b)=>a.price-b.price);
  if(sortPrice==="high") filtered.sort((a,b)=>b.price-a.price);

  renderCommunity(filtered);
}

/* ---------------- Booking ---------------- */
function goToBooking(country){
  const selected = countries.find(c=>c.name===country);
  localStorage.setItem("bookingCountry", selected.name);
  localStorage.setItem("bookingPrice", selected.price);
  localStorage.setItem("bookingTransport", selected.transport.join(", "));
  window.location.href="booking.html";
}

/* Booking page onload */
window.addEventListener("load",()=>{
  const country = localStorage.getItem("bookingCountry");
  if(country){
    const elCountry = document.getElementById("bookingCountry");
    const elPrice = document.getElementById("bookingPrice");
    const elTransport = document.getElementById("bookingTransport");
    if(elCountry) elCountry.innerText = country;
    if(elPrice) elPrice.innerText = "₹"+localStorage.getItem("bookingPrice");
    if(elTransport) elTransport.innerText = localStorage.getItem("bookingTransport");
  }
});

/* ---------------- Calendar ---------------- */
const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const monthSelect = document.getElementById("monthSelect");
if(monthSelect) monthNames.forEach((m,i)=>{ const o=document.createElement("option"); o.value=i; o.innerText=m; monthSelect.appendChild(o); });

function renderCalendar(){
  const year = parseInt(document.getElementById("yearInput").value);
  const month = parseInt(document.getElementById("monthSelect").value);
  const container = document.getElementById("calendarContainer");
  if(!container) return;

  container.innerHTML="";
  const firstDay = new Date(year,month,1).getDay();
  const daysInMonth = new Date(year,month+1,0).getDate();

  let html = "<div style='display:grid; grid-template-columns:repeat(7,1fr); gap:5px'>";
  ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(d=>html+=`<div style='font-weight:bold;text-align:center'>${d}</div>`);

  for(let i=0;i<firstDay;i++) html+="<div></div>";

  for(let d=1;d<=daysInMonth;d++){
    // Sample availability
    let available = [];
    if(d%5===0) available.push("India");
    if(d%3===0) available.push("America");
    if(d%4===0) available.push("Japan");
    html+=`<div class='day' onclick='selectDate(this)' data-available='${available.join(", ")}'>${d}<br>${available.join(", ")}</div>`;
  }
  html+="</div>";
  container.innerHTML=html;
}

function selectDate(ele){
  document.querySelectorAll(".day").forEach(d=>d.classList.remove("selected"));
  ele.classList.add("selected");
  const available = ele.getAttribute("data-available");
  alert("Selected Date: "+ele.innerText.split("\n")[0]+"\nAvailable Countries: "+(available||"None")+"\nDeparture Time: 09:00 AM"); 
}

/* ---------------- Initial Rendering ---------------- */
renderCommunity();
renderCalendar();
renderWishlist();
