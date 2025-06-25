# ✈️ FlightFinder

FlightFinder is a full-stack flight booking web application built using the **MERN stack** (MongoDB, Express, React, Node.js). Users can search for flights, select seats, make bookings, and simulate payments — all in one seamless interface.

---

## 🌐 Live Demo

> 🚧 Deployment pending. Will be updated after hosting.

---

## 🚀 Features

- 🔍 **Search Flights** by destination, date, and class
- 💺 **Seat Selection** with interactive UI
- 💳 **Payment Simulation**
- 🧾 **Booking History Page**
- 🧑‍💼 **Admin Dashboard** (Operators, Flights, Users stats)
- 🌙 **Responsive UI** – mobile-friendly layout
- 🔐 **JWT Authentication** with cookies

---

## 🛠️ Tech Stack

**Frontend:**

- React (Vite)
- Tailwind CSS
- React Router DOM
- Zustand for global state

**Backend:**

- Express.js
- MongoDB & Mongoose
- JWT for auth
- CORS + Cookie-parser

---

## 📁 Folder Structure

flightfinder/
├── client/
│ └── react/ # React frontend (Vite)
├── server/ # Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── index.js

---

## 📦 How to Run Locally

### 1. Clone the Repo

git clone https://github.com/your-username/flightfinder.git
cd flightfinder

### 2. Setup Backend

cd server
npm install

## Create .env file inside /server:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

# Then Run

npm run dev

### 3. Setup Frontend

-cd ../client/react
-npm install
-npm run dev
