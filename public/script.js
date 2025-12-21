const API = "/api";
let selectedEventId = null;

/* MODALS */
function openModal() {
  document.getElementById("modal").style.display = "flex";
}
function closeModal() {
  document.getElementById("modal").style.display = "none";
}
function openRegister(eventId) {
  selectedEventId = eventId;
  document.getElementById("registerModal").style.display = "flex";
}
function closeRegister() {
  document.getElementById("registerModal").style.display = "none";
}

/* CREATE EVENT */
async function createNewEvent() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const image = document.getElementById("image").value;

  const res = await fetch(`${API}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, date, image }),
  });

  const data = await res.json();
  alert(data.error || "Event created successfully!");
  closeModal();
  loadEvents();
}

/* REGISTER */
async function submitRegistration() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;

  const res = await fetch(`${API}/registrations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      event: selectedEventId,
    }),
  });

  const data = await res.json();
  alert(data.error || "Registered successfully!");
  closeRegister();
}

/* LOAD EVENTS */
async function loadEvents() {
  const res = await fetch(`${API}/events`);
  const events = await res.json();

  const container = document.getElementById("events");
  container.innerHTML = "";

  events.forEach((event) => {
    container.innerHTML += `
      <div class="event-card">
        <img src="${
          event.image || "https://source.unsplash.com/400x300/?event"
        }" />
        <div class="content">
          <span class="tag">Upcoming</span>
          <h3>${event.title}</h3>
          <p>${new Date(event.date).toDateString()}</p>
          <button onclick="openRegister('${event._id}')">Register</button>
        </div>
      </div>
    `;
  });
}

loadEvents();
