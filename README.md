# MERN User Manager

A simple MERN stack application to manage users.
You can add, view, and delete users with details like name, address, number, and gender.
Built with MongoDB, Express, React, Node.js, and Bootstrap for styling.

---

## Features

- Add new users with name, address, phone number, and gender
- View all saved users
- Delete users
- Fully connected frontend & backend using REST API
- Data stored in MongoDB Atlas (or local MongoDB)

---

## Tech Stack

- Frontend: React, Bootstrap
- Backend: Node.js, Express
- Database: MongoDB / MongoDB Atlas
- API: REST
- Other: CORS, dotenv


## Setup & Installation

### Backend

1. Navigate to backend folder:
   cd backend

2. Install dependencies:
   npm install

3. Create `.env` file:
   MONGO_URI=your_mongodb_connection_string
   PORT=5000

4. Start server:
   node server.js

Server will run at http://localhost:5000

---

### Frontend

1. Navigate to frontend folder:
   cd frontend

2. Install dependencies:
   npm install

3. Start React app:
   npm start

Frontend will run at http://localhost:3000

---

## API Endpoints

| Method | Endpoint         | Description       |
|--------|----------------|------------------|
| GET    | /api/users     | Fetch all users  |
| POST   | /api/users/add | Add a new user   |
| DELETE | /api/users/:id | Delete user by ID|

---

## Contributing

1. Fork the repository
2. Create a branch: git checkout -b feature/your-feature
3. Commit your changes: git commit -m "Add feature"
4. Push to branch: git push origin feature/your-feature
5. Open a Pull Request

---


