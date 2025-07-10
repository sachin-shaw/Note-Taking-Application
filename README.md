# 📝 Note-Taking Application

A modern, responsive full-stack app featuring email/OTP and Google OAuth authentication, secure note management, and mobile-first design.

---

## 📌 Features

- **User Authentication**
  - Email-based signup and login with OTP verification
  - Google OAuth 2.0 integration
  - JWT-based session management
  - Input validation and meaningful error messages

- **Notes**
  - Create, view, and delete personal notes
  - User-scoped storage in the database
  - Secure API access via JWT

- **User Experience**
  - Clean and intuitive UI
  - Fully responsive (desktops, tablets, phones)
  - Structured error handling (backend and frontend)

---

## 🛠️ Tech Stack

| Layer       | Technology              |
|-------------|--------------------------|
| Frontend    | React (TypeScript), Vite|
| Backend     | Node.js (TypeScript), Express |
| Auth        | JWT, Google OAuth, OTP via email |
| Database    | MongoDB                  |

---

## 🚀 Quickstart

### 1. Clone the repo
🚀 Quickstart
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/Note-Taking-Application.git
cd Note-Taking-Application
2. Configure Environment Variables
📂 backend/.env
env
Copy
Edit
PORT=5000
DATABASE_URL=<your_mongo_uri>
JWT_SECRET=<your_jwt_secret>
GOOGLE_CLIENT_ID=<google_oauth_client_id>
EMAIL_SERVICE=gmail
EMAIL_USER=<gmail_user>
EMAIL_PASS=<gmail_app_password>
FRONTEND_URL=http://localhost:3000
📂 frontend/.env
env
Copy
Edit
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=<google_oauth_client_id>
3. Install Dependencies
bash
Copy
Edit
cd backend && npm install
cd ../frontend && npm install
4. Start Development Servers
bash
Copy
Edit
# Start Backend
cd backend
npm run dev   # Runs on http://localhost:5000

# Start Frontend
cd ../frontend
npm run dev   # Runs on http://localhost:3000
📦 Production Build & Deployment
🔧 Frontend
bash
Copy
Edit
cd frontend
npm run build
⚡ Deploy the generated dist/ folder (from Vite) to a static host like Vercel, Netlify, or GitHub Pages.

🔧 Backend
bash
Copy
Edit
cd backend
npm run build
npm start
🚀 Deploy the backend folder to a Node.js host like Render, Heroku, or Railway.

# 🧩 API Endpoints
Auth
POST /api/auth/signup — Sign up via email & OTP

POST /api/auth/verify-otp — Confirm OTP

POST /api/auth/login — Email login

POST /api/auth/google — Google login/signup

Notes (Authenticated)
GET /api/notes

POST /api/notes

DELETE /api/notes/:id

Users
GET /api/user/profile

---
#📁 Project Structure
bash
Copy
Edit
├── frontend/
│   ├── src/
│   │   ├── components/  # UI & forms
│   │   ├── contexts/    # Auth state management
│   │   ├── services/    # API calls
│   │   └── types/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
---
#🧠 Deployment Tips
Frontend: Deploy Vite build to Vercel/Netlify

Backend: Use Render or Heroku – ensure TypeScript builds and .env variables are configured

CORS setup: Backend reads FRONTEND_URL for allowed origins

Google OAuth: Register localhost:3000 and the production URL in Google's OAuth settings
---
# Next Steps & Contributions
User profile editing

Note editing and rich text support

Tagging, search, and filtering notes

One-click Google One-Tap login

Automated tests (Jest, React Testing Library)

CI/CD setup (GitHub Actions)

Dockerize apps for container deployment

Contributions welcome — fork the repo, add features or fixes, and create PRs!
---
# License
This project is licensed under the MIT License. See LICENSE for details.
---
# Contact
Have questions or ideas? Reach me at:

🚀 GitHub: yourgithubusername

✉️ Email: your.email@example.com
