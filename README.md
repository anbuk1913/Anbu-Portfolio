# Portfolio — Full Stack Developer

A sleek black & white portfolio with **GSAP animations**, built with **React + TypeScript (Vite)** on the frontend and **Express + TypeScript** on the backend.

---

## Project Structure

```
portfolio/
├── frontend/          # React 18 + TypeScript + Vite + GSAP
│   └── src/
│       ├── components/   # Cursor, Navbar, Hero, About, Projects, Contact, Marquee
│       ├── data/         # Portfolio content (projects, skills)
│       └── App.tsx
│
└── backend/           # Express + TypeScript
    └── src/
        ├── routes/       # /api/contact
        ├── mailer.ts     # Nodemailer email service
        └── index.ts      # Server entry
```

---

## Quick Start

### 1. Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# Fill in your SMTP credentials in .env
npm install
npm run dev
# → http://localhost:5000
```

---

## Environment Variables (backend/.env)

| Variable           | Description                         |
|--------------------|-------------------------------------|
| `PORT`             | Server port (default: 5000)         |
| `SMTP_HOST`        | SMTP server (e.g. smtp.gmail.com)   |
| `SMTP_PORT`        | SMTP port (587 for TLS)             |
| `SMTP_USER`        | Your email address                  |
| `SMTP_PASS`        | App password (Gmail: App Passwords) |
| `CONTACT_RECEIVER` | Email that receives contact forms   |
| `FRONTEND_URL`     | Frontend URL (for CORS)             |

> **Gmail users:** Enable 2FA and generate an [App Password](https://myaccount.google.com/apppasswords) — do NOT use your main password.

---

## Personalisation Checklist

- [ ] `frontend/src/data/portfolio.ts` — update your email, GitHub, LinkedIn
- [ ] `frontend/src/components/Contact.tsx` — update social links
- [ ] `backend/.env` — fill in SMTP credentials
- [ ] Add `public/resume.pdf` inside `frontend/public/`
- [ ] Replace `DEV` logo text in Navbar with your initials

---

## Tech Stack

| Layer     | Stack                                                  |
|-----------|--------------------------------------------------------|
| Frontend  | React 18, TypeScript, Vite, GSAP 3, CSS Modules        |
| Backend   | Node.js, Express, TypeScript, Nodemailer, Zod, Helmet  |
| Fonts     | Cormorant Garamond, DM Mono, Bebas Neue (Google Fonts) |

---

## Production Build

```bash
# Build frontend
cd frontend && npm run build

# Build backend
cd backend && npm run build && npm start
```

The Express server will serve the React build statically in production mode.

---

## Features

- ✦ GSAP scroll-triggered animations on every section
- ✦ Custom animated cursor (hidden on touch devices)
- ✦ Smooth stagger text reveals & marquee ticker
- ✦ Expandable project rows with hover detail reveal
- ✦ Contact form with real email delivery (Nodemailer)
- ✦ Rate limiting (5 messages / 15 min) to prevent spam
- ✦ Fully responsive — mobile, tablet, desktop
- ✦ Scroll progress bar
- ✦ Noise texture overlay for depth
