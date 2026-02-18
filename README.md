# SOET College Website

A modern, responsive website for the School of Engineering and Technology (SOET) built with React, Vite, and a custom Express backend.

## Features

- **Teacher Dashboard**: Manage events, notices, timetables, and programs
- **Student Login**: Access portal for students
- **Responsive Design**: Optimized for all device sizes
- **Modern UI**: Clean, professional design
- **Fast Performance**: Built with Vite for lightning-fast development and builds
- **SEO Friendly**: Proper meta tags and semantic HTML

## Tech Stack

- **Frontend**: React 19, React Router DOM
- **Build Tool**: Vite
- **Styling**: CSS Variables with custom design system
- **Icons**: Lucide React, React Icons
- **Backend**: Express.js with JSON file storage
- **Deployment**: Nginx for static hosting with API proxy

## Quick Start for Development

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation & Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd website
   ```

2. Install all dependencies (frontend and backend):
   ```bash
   npm install
   cd backend
   npm install
   cd ..
   ```

3. Start both frontend and backend in development mode:
   ```bash
   # Terminal 1: Start Backend (runs on port 3001) - with auto-restart
   cd backend
   npm run dev

   # Terminal 2: Start Frontend (runs on port 5173) - with hot reload
   npm run dev
   ```

4. Open your browser and navigate to:
   - **Frontend**: [http://localhost:5173](http://localhost:5173) (or next available port if 5173 is in use)
   - **Backend API**: [http://localhost:3001](http://localhost:3001)

### Debugging Tips

- **Frontend Hot Reload**: Changes to React components automatically refresh in the browser
- **Backend Auto-Restart**: The backend uses `nodemon` for automatic restarts on file changes
- **API Endpoints**:
  - Events: `GET/POST/PUT/DELETE /api/events`
  - Notices: `GET/POST/PUT/DELETE /api/notices`
  - Timetable: `GET/POST/PUT/DELETE /api/timetable`
  - Programs: `GET/POST/PUT/DELETE /api/programs`
  - Login: `POST /api/login`
- **Teacher Dashboard Access**: Use `/teacher-login` route (username: 'teacher', password: 'password')
- **Student Dashboard Access**: Use `/student-login` route

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deploy with Nginx

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Copy the `nginx.conf` file to your Nginx sites-enabled directory (Linux/Mac) or conf directory (Windows).

3. Update the `root` path in `nginx.conf` to point to your `dist` directory.

4. Start the backend:
   ```bash
   cd backend
   npm start
   ```

5. Start Nginx:
   ```bash
   sudo nginx  # Linux/Mac
   # or
   nginx.exe   # Windows
   ```

6. Access your site at `http://localhost`

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React contexts
├── pages/              # Page components
├── styles/             # Global styles and CSS
├── data/               # Static data files
├── lib/                # Utility libraries
└── assets/             # Static assets
backend/
├── server.js           # Express server
├── package.json        # Backend dependencies
├── events.json         # Events data storage
└── notices.json        # Notices data storage
dist/                   # Built frontend files
nginx.conf              # Nginx configuration
```

## Configuration

### Backend API

The backend runs on port 3001 and provides REST endpoints for:
- `/api/events` - CRUD operations for events
- `/api/notices` - CRUD operations for notices
- `/api/login` - Basic authentication

Data is stored in JSON files for simplicity.

### Theme System

The app uses CSS custom properties for theming. Themes are stored in localStorage and applied via data attributes on the root element.

- Light mode: `data-theme="light"`
- Dark mode: `data-theme="dark"`

Visual effects can be toggled on/off:

- Effects on: `data-effects="on"`
- Effects off: `data-effects="off"`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend API Endpoints

| Resource | Endpoints |
|----------|-----------|
| Events | `GET/POST/PUT/DELETE /api/events` |
| Notices | `GET/POST/PUT/DELETE /api/notices` |
| Timetable | `GET/POST/PUT/DELETE /api/timetable` |
| Programs | `GET/POST/PUT/DELETE /api/programs` |
| Faculty | `GET/POST/PUT/DELETE /api/faculty` |
| Placements | `GET/POST/PUT/DELETE /api/placements` |
| Site Config | `GET/PUT /api/site-config` |
| Stats | `GET/PUT /api/stats` |
| Auth | `POST /api/login`, `POST /api/admin-login` |

### Admin Access

- **Admin Dashboard**: `/admin-login` → username: `admin`, password: `admin123`
- **Teacher Dashboard**: `/teacher-login` → username: `teacher`, password: `password`

---

## Changelog — Optimization & Fixes

### 1. Event Page Card Colors Fixed
- Event cards now use `var(--surface-card)` (cream in light mode, dark surface in dark mode) instead of white
- Events page select dropdown fixed from hardcoded `background: white` to `var(--surface-input)`
- All `border-radius` and `font-size` values changed to use CSS variables (`--radius-md`, `--font-size-sm`)

### 2. Event Page Aligned to Standard Color Palette
- Social card top color changed from hardcoded `#22c55e`/`#16a34a` to CSS variable `--color-social-green` (with fallback)
- All event page components now use the standard `--surface-card`, `--text-primary`, `--text-secondary` palette

### 3. Blue Buttons Fixed to Primary Red
- `.btn-primary` override at the bottom of `global.css` (from Teacher/Student Dashboard section) was overriding the correct red definition with `#007bff` blue — **removed**
- `.read-more-btn`, `.register-btn`, `.event-type`, `.action-btn:hover`, `.event-date` badges in Student Dashboard all changed from `#007bff` blue to `var(--color-primary-red)`
- "Apply Now", "Explore", "Add" and all CTA buttons now correctly use the red gradient

### 4. Global CSS Deduplicated & Optimized
- **18 redundant CSS files deleted**: `Events.css`, `Home.css`, `About.css`, `Admissions.css`, `Contact.css`, `Departments.css`, `Faculty.css`, `Notices.css`, `Societies.css`, `VCVision.css`, `StudentDashboard.css`, `TeacherDashboard.css`, `Navbar.css`, `Footer.css`, `ThemeToggle.css`, `EffectsToggle.css`, `App.css`, `index.css`
- All styles were already duplicated in `global.css` — the standalone files were orphans (never imported by their JSX components)
- `App.css` was unused Vite boilerplate; `index.css` was Vite starter CSS conflicting with the project's design system
- Only `SiteMap.css` remains as a standalone import (unique styles not in global)

### 5. Student Dashboard Colors Fixed
- Replaced all hardcoded colors (`#343a40`, `#495057`, `#6c757d`, `#e9ecef`, `#f8f9fa`) with CSS variables (`--text-primary`, `--text-secondary`, `--surface-card`, `--surface-elevated`, `--border-color`)
- `.stat-card`, `.profile-section`, `.action-btn`, `.notice-card`, `.event-card` now use the theme system and work correctly in dark mode
- `.nav-tab.active` changed from green (`#28a745`) to primary red
- `.stat-icon` changed from blue (`#1976d2`) to primary red

### 6. Teacher/Admin Dashboard Forms Fixed
- Form focus states changed from `#007bff` blue to `var(--color-primary-red)` with matching box shadow
- `.item-card`, `.item-form` backgrounds use `var(--surface-elevated)` and `var(--border-color)` instead of hardcoded grays
- Scoped `.dashboard-page .form-group` selectors to avoid overriding the global form styles (Contact form, etc.)

### 7. Societies & VC Vision Pages Fixed
- `.society-card` changed from `var(--color-white)` and hardcoded shadows to `var(--surface-card)` with standard shadow/radius variables
- VC Vision hardcoded colors and sizes all replaced with CSS variables

### 8. Admin Dashboard Enhanced — Full Website CMS
- Expanded from 2 tabs (Frontend/Backend) to **7 tabs**: Site Settings, Stats, Events, Notices, Faculty, Placements, Programs
- **Site Settings tab**: Edit site name, university, tagline, approval status, contact info, address — all saved via `PUT /api/site-config`
- **Stats tab**: Add/remove/edit stat cards shown on the homepage — saved via `PUT /api/stats`
- **Generic CRUD Manager**: Events, Notices, Faculty, Placements, and Programs all use a reusable `CrudManager` component with configurable field definitions
- **Dynamic Form**: Auto-renders input fields (text, textarea, select, number, date) based on field config — supports both create and edit modes
- Backend enhanced with new routes: `/api/site-config`, `/api/stats`, `/api/faculty`, `/api/placements`

### 9. Backend API Expanded
- Added CRUD routes for Faculty (`/api/faculty`)
- Added CRUD routes for Placements (`/api/placements`)
- Added key-value routes for Site Config (`/api/site-config`) and Stats (`/api/stats`)
- All data stored in JSON files under `/backend/`
