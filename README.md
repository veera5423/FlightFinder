# ✈️ FlightFinder 
[demo video](https://drive.google.com/file/d/1vH93o_h93l0ppoDYVVDfGm0UsCoOXeJh/view?usp=sharing)

FlightFinder is a full-stack flight booking web application built using the **MERN stack** (MongoDB, Express, React, Node.js). Users can search for flights, select seats, make bookings, and simulate payments — all in one seamless interface.

---

## 🌐 Live Demo

> 🚧 Deployment pending. Will be updated after hosting.[demo video](https://drive.google.com/file/d/1vH93o_h93l0ppoDYVVDfGm0UsCoOXeJh/view?usp=sharing)

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

## 📸 Screenshots

### 🏠 Home Page
![Home]![image](https://github.com/user-attachments/assets/04381eef-4d12-43be-b361-7f926e600ef8)


### 🔍 Search Page
![Search]![image](https://github.com/user-attachments/assets/f9d27727-0ba8-449b-9987-375cdd663355)


### 💳 Payment Page
![Payment]![image](https://github.com/user-attachments/assets/1217c3a0-7bf6-4cfd-8851-5697ab83f18e)


### 📄 Booking History
![Booking History]![image](https://github.com/user-attachments/assets/cca6d96d-a29d-4aaf-b6a8-11d242e52224)

### 📊 Dashboards

### 🛠️ Admin Dashboard
![Admin Dashboard]![image](https://github.com/user-attachments/assets/9aa0567a-dd7c-4e1c-a18b-f31a2e1f1da2)


Features:
- View total users, flights, approved operators
- Approve/reject operator requests
- Real-time stats

---

### 🧑‍✈️ Operator Dashboard
![Operator Dashboard]![Screenshot 2025-06-25 184720](https://github.com/user-attachments/assets/5bdf8aba-0e85-48aa-b692-c38ebf88413e)

![image](https://github.com/user-attachments/assets/0084e763-2627-4b0d-a3a2-f2667e890db2)


Features:
- Add new flights
- View/manage owned flights
- Check booking activity (optional)



## 📁 Folder Structure

-flightfinder/
-├── client/
-│ └── react/ # React frontend (Vite)
-├── server/ # Express backend
-│ ├── controllers/
-│ ├── models/
-│ ├── routes/
-│ ├── middleware/
-│ └── index.js

---

## 📦 How to Run Locally

### 1. Clone the Repo

git clone[https://github.com/veera5423/FlightFinder.git](https://github.com/veera5423/FlightFinder)
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
