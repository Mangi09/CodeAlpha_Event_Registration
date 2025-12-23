# 🎉 EventEase – Event Registration Web App

EventEase is a simple and aesthetic event registration web application where users can create events and register for them easily.  
It focuses on clean UI, smooth user experience, and practical backend APIs.

This project was built as part of a backend development task, with added frontend polish and UX enhancements.

---

## ✨ Features

- Create events with title, description, date, and image
- Prevents creating events with past dates
- View all upcoming events as cards
- Register for events with name and email
- Cute toast notifications for success & errors
- Confetti animation on successful registration 🎉
- Edit and delete events
- Clean pastel-themed UI

---

## 🛠 Tech Stack

**Frontend**

- HTML
- CSS (custom pastel theme)
- Vanilla JavaScript

**Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 📂 Project Structure

project-root/
│
├── public/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── src/
│ ├── controllers/
│ ├── models/
│ └── routes/
│
├── server.js
├── .env
├── .gitignore
└── README.md

yaml
Copy code

---

## ⚙️ Setup Instructions

1. Clone the repository

```bash
git clone <your-repo-url>
cd eventease
Install dependencies

bash
Copy code
npm install
Create a .env file

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
Start the server

bash
Copy code
npm start
Open browser

arduino
Copy code
http://localhost:5000
📌 Notes
.env file is ignored for security reasons

MongoDB Atlas is recommended

Confetti animation is triggered only on successful registration

UI is intentionally kept simple and aesthetic

🚀 Future Improvements
Image upload using Multer

Authentication for organizers

Role-based access (admin / user)

Deployment (Render / Vercel)

👩‍💻 Author
Built with ❤️ by Dwithi Poojary

Feel free to fork, improve, or use this project for learning.
```
