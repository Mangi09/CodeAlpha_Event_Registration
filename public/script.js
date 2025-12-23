const API = "/api";
let selectedEventId = null;

/* TOAST */
function showToast(message, type = "error") {
  const toast = document.getElementById("toast");
  toast.innerText = message;

  toast.style.background = type === "success" ? "#1A659E" : "#FF4D4F";

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

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

  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    showToast("You cannot create an event with a past date ❌");
    return;
  }

  const res = await fetch(`${API}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, date, image }),
  });

  const data = await res.json();

  if (data.error) {
    showToast(data.error);
  } else {
    showToast("Event created successfully 🎉", "success");
    closeModal();
    clearCreateForm();
    loadEvents();
  }
}

/* CLEAR FORM */
function clearCreateForm() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("date").value = "";
  document.getElementById("image").value = "";
}

/* EDIT EVENT */
async function editEvent(id) {
  const newTitle = prompt("Enter new event title:");
  if (!newTitle) return;

  await fetch(`${API}/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle }),
  });

  showToast("Event updated ✨", "success");
  loadEvents();
}

/* DELETE EVENT */
async function deleteEvent(id) {
  if (!confirm("Are you sure you want to delete this event?")) return;

  await fetch(`${API}/events/${id}`, {
    method: "DELETE",
  });

  showToast("Event deleted 🗑️", "success");
  loadEvents();
}
function launchConfetti() {
  const confettiCount = 150;
  const colors = ["#FF6B35", "#F7C59F", "#1A659E", "#8dd3c7", "#ffd6e8"];

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
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

  if (data.error) {
    showToast(data.error);
  } else {
    showToast("Registered successfully 🎉", "success");
    closeRegister();

    setTimeout(() => {
      launchConfetti();
    }, 300);
  }
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

          <button onclick="openRegister('${event._id}')">
            Register
          </button>

          <div style="display:flex; gap:8px; margin-top:10px;">
            <button onclick="editEvent('${event._id}')">
              Edit
            </button>
            <button
              onclick="deleteEvent('${event._id}')"
              style="background:#ff4d4f;"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

loadEvents();
