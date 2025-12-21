const API = "/api";

async function createEvent() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;

  const res = await fetch(`${API}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, date }),
  });

  const data = await res.json();
  alert(data.error || "Event created successfully!");
  loadEvents();
}

async function loadEvents() {
  const res = await fetch(`${API}/events`);
  const events = await res.json();

  const container = document.getElementById("events");
  container.innerHTML = "";

  events.forEach((event) => {
    const div = document.createElement("div");
    div.className = "event";
    div.innerHTML = `
      <h3>${event.title}</h3>
      <p>${event.description || ""}</p>
      <p>Date: ${new Date(event.date).toDateString()}</p>
      <input placeholder="Your name" id="name-${event._id}" />
      <input placeholder="Your email" id="email-${event._id}" />
      <button onclick="register('${event._id}')">Register</button>
    `;
    container.appendChild(div);
  });
}

async function register(eventId) {
  const name = document.getElementById(`name-${eventId}`).value;
  const email = document.getElementById(`email-${eventId}`).value;

  const res = await fetch(`${API}/registrations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, event: eventId }),
  });

  const data = await res.json();
  alert(data.error || "Registered successfully!");
}

loadEvents();
