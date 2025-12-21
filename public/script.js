const API = "/api";

// MODAL
function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// CREATE EVENT
async function createNewEvent() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;

  const res = await fetch(`${API}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, date }),
  });

  const data = await res.json();
  alert(data.error || "Event created!");
  closeModal();
  loadEvents();
}

// LOAD EVENTS
async function loadEvents() {
  const res = await fetch(`${API}/events`);
  const events = await res.json();

  const container = document.getElementById("events");
  container.innerHTML = "";

  events.forEach((event) => {
    container.innerHTML += `
      <div class="event-card">
        <img src="https://source.unsplash.com/400x300/?event" />
        <div class="content">
          <span class="tag">Upcoming</span>
          <h3>${event.title}</h3>
          <p>${new Date(event.date).toDateString()}</p>
        </div>
      </div>
    `;
  });
}

loadEvents();
