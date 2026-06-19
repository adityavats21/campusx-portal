# CampusX Portal

CampusX is a full-stack MERN portal for college teams to manage study resources, campus events, student access, and AI-assisted PDF summaries from one dashboard.

## Highlights

- Role-based admin and student authentication with JWT
- Admin dashboard for event and resource management
- Student dashboard with branch/semester-aware resources
- Cloudinary-backed PDF/document uploads
- AI PDF summarization using the OpenAI API
- MongoDB Atlas persistence with Mongoose models
- Production-ready Express + React deployment on Render

## Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | React, React Router, Tailwind CSS, Axios, Lucide/React Icons |
| Backend | Node.js, Express, Mongoose, JWT, bcrypt |
| Storage | Cloudinary |
| AI | OpenAI API, pdf-parse |
| Deployment | Render, MongoDB Atlas |

## Project Structure

```text
campusx-portal/
  client/          React frontend
  server/          Express API
  render.yaml      Render web service blueprint
  .env.example     Environment variable template
```

## Auth Flow

1. Admin or student submits credentials through the login form.
2. Backend verifies credentials and returns a signed JWT.
3. Token is stored in `localStorage`.
4. Protected admin/student routes attach the token through the `Authorization` header.

## Local Setup

```bash
git clone https://github.com/adityavats21/campusx-portal.git
cd campusx-portal
npm run install:all
```

Create `server/.env` using `.env.example` as the template.

Run the backend:

```bash
npm run dev
```

Run the frontend in another terminal:

```bash
cd client
REACT_APP_API_URL=http://localhost:5006 npm start
```

## Render Deployment

Use these settings if deploying manually from the Render dashboard:

- Root directory: `campusx-portal` if your repository contains this folder, otherwise leave it blank
- Build command: `npm run render-build`
- Start command: `npm start`
- Health check path: `/api/health`

Required environment variables:

```text
MONGO_URI
JWT_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
OPENAI_API_KEY
DEFAULT_ADMIN_EMAIL
DEFAULT_ADMIN_PASSWORD
```

After deployment, open `/api/health` to confirm the backend is running, then open `/` for the React app.

## Author

**Aditya Vats**
[GitHub](https://github.com/adityavats21) · [LinkedIn](https://linkedin.com/in/adityavats21) · vatsaditya21@gmail.com
