# AgriSage

Smart Insights for Smarter Farming — a React + Vite + Tailwind CSS dashboard
for farmers, with a persistent AI assistant chatbot.

This is a **frontend-only** build. All data (soil, weather, crop
recommendations, diagnosis reports) is mocked in `src/data/mockData.js`.
Backend/Firebase/Gemini/weather/soil API integrations are stubbed out in
`src/context/AppContext.jsx` and ready to be wired up without restructuring
the UI.

## Getting started

Requires Node 18+ (see `.nvmrc`).

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

## Scripts

| Command           | What it does                          |
| ------------------ | -------------------------------------- |
| `npm run dev`       | Start the local dev server              |
| `npm run build`     | Production build to `dist/`             |
| `npm run preview`   | Preview the production build locally    |
| `npm run lint`      | Run ESLint over the project             |

## Environment variables

Copy `.env.example` to `.env` and fill in real values once a real backend is
connected. Nothing is read from `.env` yet — the app runs entirely on mock
data until the stubs in `AppContext.jsx` are wired up.

```bash
cp .env.example .env
```

`.env` is gitignored — never commit real API keys.

## Project structure

```
src/
├── components/     Reusable UI pieces (cards, chatbot, header, selectors...)
├── pages/          Login, Dashboard, CropDiagnosis
├── layouts/         DashboardLayout — persistent header/selectors/chatbot shell
├── context/         AppContext — global state + future API stubs
├── data/            Mock data (soil, weather, crops, report, countries, languages)
├── App.jsx           Route definitions
├── main.jsx           App entry point
└── index.css          Tailwind + design tokens (light/dark theme variables)
```

## State that persists across navigation

Theme, selected country, selected language, chatbot open/minimized state, and
the full chat history all live in `AppContext` above the router, so
navigating between the Dashboard and Crop Diagnosis pages never resets them.

## Deployment (Vercel)

`vercel.json` is already configured with a SPA rewrite so client-side routes
don't 404 on refresh. Push to a Git repo and import it in Vercel, or deploy
directly:

```bash
npm install -g vercel
vercel
```

Build command: `npm run build` · Output directory: `dist`
