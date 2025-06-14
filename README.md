# 🎓 CampusX: Student Resource & Event Portal

> A full-stack MERN application to manage campus events, study resources, and AI-powered PDF summaries — built with ❤️ by **Aditya Vats**.

![CampusX Banner]https://github.com/adityavats21/campusx-portal.git 

---

## Overview

CampusX is a centralized portal for colleges to manage:
- 🗓️ Upcoming events & RSVPs
- 📚 Study material uploads (PDFs, slides)
- 🤖 AI-powered PDF summarization
- 🔐 Admin-only secure backend panel

Built from scratch using **MongoDB, Express.js, React, Node.js, JWT Auth, Cloudinary, TailwindCSS**, and deployed on **Render**, **Vercel**, and **MongoDB Atlas**.

---

## Features

- 🔐 **Admin Login & JWT Authentication**
- ☁️ **Secure PDF Uploads via Cloudinary**
- 🧠 **AI Summarizer for PDFs (OpenAI API)**
- 🗓️ **Full Event Management (CRUD)**
- 🙋 **RSVP system for Students**
- 📄 **View & Access Study Resources**
- 🎨 **Fully polished, responsive UI**
- 🌐 **Deployed on Render, Vercel, Atlas**

---

## Tech Stack

| Layer         | Technology                         |
|---------------|-------------------------------------|
| Frontend      | React.js + Tailwind CSS            |
| Backend       | Express.js (Node.js)               |
| Database      | MongoDB Atlas                      |
| File Storage  | Cloudinary                         |
| AI Service    | OpenAI API (PDF Summarization)     |
| Auth          | JWT (JSON Web Tokens)              |
| Deployment    | Render (backend), Vercel (frontend) |

---

## Folder Structure

CampusX-Student-Portal/
│
├── client/ # React frontend
│ └── src/components/ # UI components (AdminLogin, Dashboard, etc.)
│
├── server/ # Express backend
│ ├── controllers/ # Route logic (admin, event, resource)
│ ├── routes/ # API routes
│ ├── models/ # Mongoose models
│ ├── middleware/ # Auth middleware
│ └── uploads/ # (If local storage used)
│
├── .env # Environment variables
├── LICENSE # MIT License
├── README.md # This file

yaml
Copy
Edit

---

## Admin Authentication

- Admin logs in using a secure form.
- Backend verifies credentials and returns a **JWT token**.
- Token is stored in browser `localStorage`.
- All sensitive backend routes (like uploading/deleting resources/events) are protected via JWT in request headers.

---

## How to Run Locally

### Clone the repository
```bash
git clone https://github.com/adityavats21/campusx-portal.git
cd campusx-portal
🔧 Setup Backend
bash
Copy
Edit
cd server
npm install
touch .env
Create .env file with:

env
Copy
Edit
PORT=5006
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
OPENAI_API_KEY=your_openai_key
Then run:

bash
Copy
Edit
npm start
🖼️ Setup Frontend
bash
Copy
Edit
cd client
npm install
npm run dev
🌐 Deployment
Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

🧾 License
This project is licensed under the MIT License — feel free to use, modify, and contribute.

🙋‍♂️ Author
Made with dedication by Aditya Vats
📧 vatsaditya21@gmail.com
🔗 LinkedIn->
🔗 GitHub->