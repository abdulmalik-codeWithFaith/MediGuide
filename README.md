# MediGuide AI

An AI-powered health guidance platform that helps people understand common symptoms, learn about health conditions, find food and lifestyle guidance, and know when to seek professional care.

> **Disclaimer:** MediGuide AI provides general educational information only. It does not diagnose conditions, replace a healthcare professional, or provide emergency care. In an emergency, contact your local emergency number or go to the nearest hospital immediately.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [How the AI Integration Works](#how-the-ai-integration-works)
- [Safety and Responsible AI](#safety-and-responsible-ai)
- [Available Routes](#available-routes)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)

---

## Features

**Built**
- Landing page with hero, features, how-it-works, safety section, and emergency notice
- AI Health Assistant chat with suggested questions, typing indicator, and error handling
- Structured answers: summary, sections, next step, and source links
- Emergency and self-harm detection before any AI call
- Fully responsive layout with subtle animations

**Planned**
- Symptom Checker (guided questionnaire)
- Condition-based Food Guidance (HIV, hepatitis, diabetes, hypertension)
- Health Library (searchable articles)
- Dashboard, saved guides, and settings

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, TypeScript (Create React App) |
| Styling | Tailwind CSS v3 |
| Routing | React Router |
| Icons and animation | Lucide React, Framer Motion |
| Backend | Node.js, Express, TypeScript (run with `tsx`) |
| AI | Google Gemini API (`@google/genai`) |

---

## Project Structure

```
mediguide-ai/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── chat/
│   │       ├── ChatMessage.tsx
│   │       ├── ChatInput.tsx
│   │       └── ResponseCard.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── Assistant.tsx
│   ├── services/
│   │   └── aiService.ts        # Calls our backend, never Gemini directly
│   ├── types/
│   │   └── health.ts           # HealthResponse, ChatMessage, etc.
│   ├── App.tsx                 # Routes
│   └── index.tsx
├── server/
│   ├── index.ts                # Express app, validation, rate limiting
│   ├── gemini.ts               # System prompt, response schema, Gemini call
│   ├── safety.ts               # Emergency and self-harm detection
│   ├── sources.ts              # Curated trusted-source catalogue
│   ├── types.ts                # Shared response types
│   ├── .env.example
│   └── package.json
├── .env                        # Frontend env (API URL only, no secrets)
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 20 or newer (`node -v`)
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

### 1. Clone and install the frontend

```bash
git clone <your-repo-url>
cd mediguide-ai
npm install
```

### 2. Install the backend

```bash
cd server
npm install
cd ..
```

### 3. Configure environment variables

Backend: copy the example file and add your key.

```bash
cp server/.env.example server/.env
```

Frontend: create a `.env` file in the project root.

```
REACT_APP_API_URL=http://localhost:5000
```

### 4. Run both servers (two terminals)

```bash
# Terminal 1: backend
cd server
npm run dev

# Terminal 2: frontend
npm start
```

- Frontend: http://localhost:3000
- Backend health check: http://localhost:5000/api/health

> Restart each server after changing any `.env` file. Create React App and the backend only read them at startup.

---

## Environment Variables

### Backend (`server/.env`)

| Variable | Required | Description |
| --- | --- | --- |
| `GEMINI_API_KEY` | Yes | Your Gemini API key. Keep it secret. |
| `GEMINI_MODEL` | No | Model name. Defaults to `gemini-3.1-flash-lite`. Set this if you use another model, for example `gemini-2.5-flash`. |
| `PORT` | No | Server port. Defaults to `5000`. |
| `CLIENT_ORIGIN` | No | Allowed frontend origin. Defaults to `http://localhost:3000`. |

### Frontend (`.env` in the project root)

| Variable | Required | Description |
| --- | --- | --- |
| `REACT_APP_API_URL` | No | Backend address. If unset, requests go to `/api/chat` and rely on the CRA `proxy` setting. |

> **Never** put the Gemini API key in a `REACT_APP_` variable. Anything with that prefix is bundled into the browser code and is public.

---

## How the AI Integration Works

```
User question
   │
   ▼
React (aiService.ts) ──► POST /api/chat
   │
   ▼
Express server
   1. Validate input (length, type, history size) and rate-limit
   2. Safety check (safety.ts): emergency or self-harm wording
        ├─ match ──► return a fixed, reviewed response (no AI call)
        └─ no match ▼
   3. Gemini call (gemini.ts)
        - system prompt with safety rules
        - structured JSON output via a response schema
   4. Validate the model output and rebuild sources from our catalogue
   │
   ▼
HealthResponse JSON ──► rendered by ResponseCard
```

**The response shape** (`src/types/health.ts`):

```ts
{
  severity: "info" | "caution" | "emergency";
  summary: string;
  sections: { heading: string; body?: string; items?: string[] }[];
  nextStep: string;
  sources: { title: string; publisher: string; url: string }[];
}
```

**Sources:** Gemini can only choose source IDs from the catalogue in `server/sources.ts`. The server converts those IDs into real links, so the model cannot invent a citation. Verify each URL, and add more pages as the library grows.

---

## Safety and Responsible AI

- **No diagnosis.** The assistant explains and educates. It never states that a user has a disease.
- **Emergency escalation.** Warning signs (such as chest pain or severe breathing difficulty) return a fixed emergency response before any AI call. Self-harm wording returns a separate supportive response.
- **Medication caution.** The assistant never advises stopping prescribed medication, including HIV treatment.
- **No universal food lists.** Advice is framed as dependent on condition type, stage, and medicines.
- **Real sources only.** Citations come from a curated catalogue, not from the model.
- **Privacy.** The chat is not stored by default, and users are asked not to share names, addresses, or ID numbers. Check the data terms of your Gemini API tier, as free-tier prompts may be used to improve Google's products.
- **Server-side secrets and limits.** The API key stays on the server, requests are rate-limited, and error details are logged on the server only.

The keyword list in `server/safety.ts` is a starting safety net, not a complete detector. Extend and test it as part of your safety review.

---

## Available Routes

| Route | Status |
| --- | --- |
| `/` | Landing page |
| `/assistant` | AI Health Assistant |
| `/symptom-checker` | Placeholder |
| `/food-guidance` | Placeholder |
| `/health-library` | Placeholder |

---

## Troubleshooting

**"Sorry, something went wrong while getting your answer"**
This is the page's generic error. Find the real cause in the backend terminal, where failures are logged as `Gemini error: ...`.

**404 on `/api/chat`**
The request is not reaching the backend. Check that `REACT_APP_API_URL` is set in the root `.env` and restart the frontend, or make sure `"proxy": "http://localhost:5000"` is a top-level key in the root `package.json`.

**`GEMINI_API_KEY is missing`**
The `.env` file is missing or is not inside `server/`. Copy `.env.example` to `.env` there.

**"Model not found" or a 404 from Gemini**
Model names change over time. Set `GEMINI_MODEL` in `server/.env` to a model currently listed in Google AI Studio, then restart the server.

**`429` or quota errors**
You have reached the API rate limit. Wait a minute and try again.

**`Cannot find namespace 'JSX'`**
Caused by newer React type definitions. Use `ReactNode` from `react` instead of `JSX.Element`. This is already applied in `ResponseCard.tsx`.

**`npm install` inside `server/` changed the frontend `package.json`**
Run `npm init -y` inside `server/` first, so the backend has its own `package.json`, then install.

---

## Roadmap

1. **Planning and design:** scope, wireframes, palette, reusable components (done)
2. **Frontend development:** landing page and assistant chat (done), symptom checker, food guidance, library, dashboard
3. **AI integration:** secure backend, prompt rules, structured responses, source references (done for the assistant)
4. **Health knowledge and safety:** expand trusted sources, review condition-specific advice, test unsafe and misleading prompts
5. **Testing and deployment:** responsiveness, accessibility, form validation, API failures, privacy behavior, deployment

---

## Notes on Create React App

Create React App is deprecated and no longer receives updates. It is fine for this project, but consider Vite for new projects.