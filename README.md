# Community Skill-Sharing Platform

A minimal full-stack skeleton for a community skill-sharing platform:
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express + Mongoose (MongoDB)
- Real-time: Socket.IO (basic chat/events)
- Payments: Stripe integration placeholders
- Deployment: Ready to deploy to Netlify (frontend) / Railway/Heroku (backend)

## What's included
- `frontend/` — Vite React app with Tailwind and example pages (Home, Workshops, Workshop page)
- `backend/` — Express server with Mongoose models, routes, Socket.IO setup, and Stripe placeholder
- `.env.example` files showing required environment variables
- `README` with setup steps

## Quick setup (local)

1. Clone or unzip the project:
   ```bash
   unzip community-skill-share.zip
   cd community-skill-share
   ```

2. Backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # edit .env to add MONGO_URI and STRIPE_SECRET_KEY
   node server.js
   ```
   Backend will run on port 5000 by default.

3. Frontend:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   Frontend will run on port 5173 by default.

## Notes
- This is a starter template. Replace Stripe keys, MongoDB URI, and enhance security for production.
- To make a GitHub repo: create a new repo on GitHub, then `git init`, `git add .`, `git commit -m "Initial"`, `git remote add origin <your-repo-url>`, and `git push -u origin main`.

Enjoy! — Generated for you by ChatGPT
