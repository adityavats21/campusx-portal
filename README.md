# CampusX — Student Resource & Event Portal

A full-stack MERN application for college event management, study resource sharing, and AI-powered PDF summarization — with JWT-secured admin panel and cloud file storage.

---

## Features

- **JWT Authentication** — secure admin login with token-based route protection
- **Event Management** — full CRUD for campus events with student RSVP system
- **Study Resource Library** — PDF/slide uploads via Cloudinary with browsable dashboard
- **AI PDF Summarizer** — OpenAI API integration to auto-summarize uploaded documents
- **Responsive UI** — React + TailwindCSS with polished component design

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, TailwindCSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| File Storage | Cloudinary |
| AI Service | OpenAI API |
| Auth | JWT (JSON Web Tokens) |
| Deployment | Render (backend), Vercel (frontend), MongoDB Atlas |

---

## Architecture

```
client/                         # React frontend
├── src/components/             # AdminLogin, Dashboard, EventCard, ResourceViewer
server/                         # Express backend
├── controllers/                # admin, event, resource logic
├── routes/                     # API route definitions
├── models/                     # Mongoose schemas
└── middleware/                 # JWT auth middleware
```

---

## Auth Flow

1. Admin submits credentials via login form
2. Backend verifies and returns a signed JWT
3. Token stored in `localStorage` and attached to all subsequent request headers
4. Protected routes (upload, delete, create) reject requests without valid token

---

## Local Setup

### 1. Clone

```bash
git clone https://github.com/adityavats21/campusx-portal.git
cd campusx-portal
```

### 2. Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5006
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
OPENAI_API_KEY=your_openai_key
```

```bash
npm start
```

### 3. Frontend

```bash
cd client
npm install
npm run dev
```

---

## License

MIT

---

## Author

**Aditya Vats**
[GitHub](https://github.com/adityavats21) · [LinkedIn](https://linkedin.com/in/adityavats21) · vatsaditya21@gmail.com
