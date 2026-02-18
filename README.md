# SoET — School of Engineering and Technology

College website for SoET, Vikram University, Ujjain. Built with React 19 + Vite + Express.js.

**Live**: [https://VectorBlue-06.github.io/website/](https://VectorBlue-06.github.io/website/)

## Setup

```bash
# Install
npm install
cd backend && npm install && cd ..

# Run (two terminals)
cd backend && npm run dev    # Backend — port 3001
npm run dev                  # Frontend — port 5173
```

> **Note:** Both terminals must be running. The frontend proxies `/api` calls to the backend via Vite config. If you only start the frontend, events/notices/faculty etc. won't load — they'll fall back to static data.

## Project Structure

```
src/
├── components/     CrudManager, Navbar, Footer, Layout, ThemeToggle, EffectsToggle
├── pages/          21 page components (Home, About, NCC, Events, Notices, etc.)
├── styles/         global.css — single stylesheet for the entire app
├── data/           Static fallback data (activities, facilities, faculty, academics)
├── context/        ThemeContext, EffectsContext
├── lib/            Hooks, Supabase client
└── assets/         Images (NCC logo/bg, VC photo, etc.)
backend/
├── server.js       Express API server
└── *.json          Data files (auto-created on first use)
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About Us |
| `/departments` | Departments |
| `/faculty` | Faculty |
| `/admissions` | Admissions |
| `/events` | Events |
| `/notices` | Notices |
| `/placements` | Placements |
| `/societies` | Societies |
| `/ncc` | NCC |
| `/vc-vision` | VC's Vision |
| `/anti-ragging` | Anti-Ragging |
| `/contact` | Contact |
| `/sitemap` | Site Map |
| `/teacher-login` | Teacher → Dashboard |
| `/admin-login` | Admin → Dashboard |
| `/student-login` | Student → Dashboard |

## Dashboards

### Teacher Dashboard (`/teacher-login`)

Manages: **Events**, **Notices**, **Timetable**, **Programs**

No password required — auto-redirects to dashboard.

### Admin Dashboard (`/admin-login`)

Manages everything the teacher can, plus:

| Tab | What it manages |
|-----|----------------|
| Contact & Info | Emails, phone numbers, NCC contact, WhatsApp, social media URLs |
| Stats | Homepage stat cards (editable count & label) |
| Faculty | Full faculty CRUD |
| Placements | Alumni placement records |
| Societies | Student societies/clubs |
| Students | Enrolled student database |

No password required — auto-redirects to dashboard.

> **Note:** College identity (name, university, address, founding year) is hardcoded and not editable from the dashboard. Only dynamic data like phone numbers, emails, faculty, events, etc. can be changed.

## Backend API

All data stored as JSON files in `backend/`. Files are auto-created on first request.

| Resource | Endpoints |
|----------|-----------|
| Events | `GET/POST/PUT/DELETE /api/events` |
| Notices | `GET/POST/PUT/DELETE /api/notices` |
| Timetable | `GET/POST/PUT/DELETE /api/timetable` |
| Programs | `GET/POST/PUT/DELETE /api/programs` |
| Faculty | `GET/POST/PUT/DELETE /api/faculty` |
| Placements | `GET/POST/PUT/DELETE /api/placements` |
| Societies | `GET/POST/PUT/DELETE /api/societies` |
| Students | `GET/POST/PUT/DELETE /api/students` |
| Site Config | `GET/PUT /api/site-config` |
| Stats | `GET/PUT /api/stats` |

> **Note:** The Vite dev server proxies `/api` → `localhost:3001`. In production (Nginx), configure a similar proxy or serve the API on the same domain.

## Theming

CSS variables in `global.css` control all colors, spacing, and typography.

- **Light / Dark mode** — toggled via `data-theme` attribute
- **Effects on / off** — glass blur & glow effects via `data-effects` attribute
- **Primary colors** — `--color-primary-red: #841C2C`, `--color-primary-blue: #211D70`

> **Note:** All styles live in one file (`src/styles/global.css`). There are no per-page CSS files except `SiteMap.css`. Do not create new CSS files — add styles to `global.css` instead.

## Build & Deploy

```bash
npm run build       # Output → dist/
npm run preview     # Preview production build locally
npm run deploy      # Deploy to GitHub Pages
```

For Nginx deployment, use the included `nginx.conf` and update the `root` path to your `dist/` directory.

## Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Deploy to GitHub Pages |

## Tech Stack

React 19 · Vite · React Router DOM · Lucide React · Express.js · JSON file storage
