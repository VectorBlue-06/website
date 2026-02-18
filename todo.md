# SoET Website — TODO & Audit

## What's Missing as a College Website

| # | Feature | Why it matters |
|---|---------|---------------|
| 1 | **Real authentication system** | Right now all logins auto-redirect. No passwords, no tokens, no sessions. Anyone can type `/admin-dashboard` in the URL and get full admin access. |
| 2 | **Student portal with real data** | Student dashboard is entirely hardcoded ("John Doe", CGPA 8.5). No actual student records, results, attendance, or fee info. |
| 3 | **Results / Marks section** | Students need to check their semester results. Currently no such page exists. |
| 4 | **Attendance tracking** | No attendance system — a basic expectation of any college portal. |
| 5 | **Fee payment gateway** | No online fee payment or fee status page. |
| 6 | **Downloadable resources** | No syllabus PDFs, question papers, study materials, or timetable downloads. |
| 7 | **Image gallery** | Photos exist in `/public/images/` but there's no gallery page to browse them. |
| 8 | **News / Announcements ticker** | Homepage has no scrolling news bar — most college sites have one. |
| 9 | **Grievance / Feedback form** | No mechanism for students to submit complaints or feedback. |
| 10 | **Alumni network page** | Placements page exists but no alumni directory or alumni registration. |
| 11 | **RTI / Mandatory disclosures** | Required by AICTE/UGC — not present. |
| 12 | **Examination schedule** | No dedicated exam timetable page. |
| 13 | **Library system** | No integration with the college library catalog. |
| 14 | **Multi-language support** | Hindi + English at minimum for a state university. |
| 15 | **Accessibility (a11y)** | No skip links, no aria labels on interactive elements, no screen reader testing. |
| 16 | **Search functionality** | No site-wide search. |
| 17 | **404 page** | Unmatched URLs show a blank page. No catch-all route. |

---

## What Can Be Added

| # | Addition | Effort |
|---|----------|--------|
| 1 | **Protected routes** — wrap dashboards in an auth guard component | Small |
| 2 | **JWT authentication** — issue tokens on login, verify on every API call | Medium |
| 3 | **Lazy loading pages** — `React.lazy()` + `Suspense` for route-level code splitting | Small |
| 4 | **404 catch-all route** — a proper "Page Not Found" component | Small |
| 5 | **Image gallery page** — grid of college/event photos from `/public/images/` | Medium |
| 6 | **PDF viewer / downloads** — syllabus and question papers | Medium |
| 7 | **Pagination on API responses** — backend returns everything at once right now | Small |
| 8 | **Search / filter on events, notices, faculty** | Medium |
| 9 | **File upload** — let admins upload images/PDFs from the dashboard | Medium |
| 10 | **Email notifications** — on new events/notices | Large |
| 11 | **PWA support** — service worker for offline access + push notifications | Medium |
| 12 | **SEO improvements** — dynamic meta tags, Open Graph, structured data | Small |
| 13 | **Analytics** — basic page view tracking | Small |
| 14 | **Grievance form** — submit + track complaints | Medium |
| 15 | **Online exam / quiz system** | Large |

---

## Where the Site Can Break

| # | Scenario | What happens |
|---|----------|-------------|
| 1 | **Backend not running** | All CRUD operations fail silently. Events, notices, faculty pages show nothing — they don't fall back gracefully everywhere. |
| 2 | **Concurrent writes to the same JSON file** | Two admins editing at once → read-modify-write race condition → data loss. JSON files have no locking. |
| 3 | **Large data volumes** | Backend reads the ENTIRE JSON file on every request. 10,000 events → multi-second response times, high memory usage. |
| 4 | **Oversized API payloads** | No `express.json({ limit })` set. Attacker can POST gigabytes, crashing the server. |
| 5 | **`Date.now()` ID collisions** | Two items created in the same millisecond get the same ID. Edits/deletes affect the wrong record. |
| 6 | **GitHub Pages has no backend** | The production site on GH Pages has no API server. All dashboard features are non-functional in production. |
| 7 | **Single CSS file (4,300+ lines)** | Any syntax error in `global.css` breaks styling for the entire site. |
| 8 | **No error boundaries** | A crash in any component takes down the whole page. No React Error Boundary wrappers. |
| 9 | **External font dependency** | Google Fonts CDN goes down → fallback font kicks in, layout shifts. |
| 10 | **No health check endpoint** | No way to monitor if the backend is alive. |

---

## Optimizations That Can Be Done Right Now

| # | Optimization | Impact |
|---|-------------|--------|
| 1 | **Add `express.json({ limit: '100kb' })`** to backend — prevents payload bombs | High |
| 2 | **Use `uuid` or `crypto.randomUUID()` instead of `Date.now()`** for IDs | Medium |
| 3 | **Switch to async file I/O** — `fs.promises.readFile` / `writeFile` instead of `readFileSync` / `writeFileSync` | Medium |
| 4 | **Remove `@supabase/supabase-js`** from dependencies — it's unused, adds ~50KB gzipped | Small |
| 5 | **Move `gh-pages` to devDependencies** — it's a build tool, not a runtime dep | Small |
| 6 | **Pick one icon library** — both `lucide-react` AND `react-icons` are included. Use one. | Small |
| 7 | **Add React.lazy() for pages** — reduce initial bundle from 342KB to ~150KB | High |
| 8 | **Add a 404 route** — `<Route path="*" element={<NotFound />} />` | Small |
| 9 | **Compress the VC photo** — `vc-sir-BvkQyR30.jpg` is 1.4MB. Convert to WebP/AVIF → ~200KB | High |
| 10 | **Self-host Poppins font** — eliminates render-blocking Google Fonts request | Medium |
| 11 | **Add `font-display: swap`** to font imports | Small |
| 12 | **Configure Vite manual chunks** — split vendor libs (react, react-router, lucide) into separate chunks for better caching | Medium |

---

## Is It Really Secure Right Now?

**No. It is completely insecure.**

### The hard truth:

1. **Zero authentication exists.** All three login pages auto-redirect to their dashboards. There's no password check, no token, no session. Typing `/admin-dashboard` in the browser gives full admin access.

2. **All API endpoints are fully public.** Every `POST`, `PUT`, `DELETE` route has no auth middleware. Anyone with `curl` can:
   ```bash
   curl -X DELETE http://yoursite:3001/api/events/1234
   curl -X PUT http://yoursite:3001/api/site-config -H "Content-Type: application/json" -d '{"siteName": "HACKED"}'
   ```

3. **Hardcoded credentials in source code.** `server.js` still has `admin/admin123` and `teacher/password` in plaintext — visible to anyone who reads the GitHub repo.

4. **No input validation.** `req.body` is spread directly into stored records. An attacker can inject any fields, including XSS payloads:
   ```bash
   curl -X POST http://yoursite:3001/api/events -H "Content-Type: application/json" -d '{"title": "<script>alert(document.cookie)</script>"}'
   ```

5. **CORS is wide open.** `app.use(cors())` with no config allows ANY website to make API calls to your backend.

---

## Is the Database and Backend Strong?

**No. Both are fragile.**

| Problem | Detail |
|---------|--------|
| **No real database** | Data is stored in flat JSON files on disk. No indexing, no queries, no transactions, no backups. |
| **Synchronous I/O** | `readFileSync`/`writeFileSync` block the entire Node.js event loop. One slow disk read freezes the server for all users. |
| **No connection pooling** | Not applicable (no database), but when you migrate to a DB, you'll need it. |
| **No data backup** | If the server disk dies, all data is gone. No replication, no snapshots. |
| **No validation layer** | Backend accepts and stores anything. No schema enforcement. |
| **Single point of failure** | One Express process, one server, no clustering, no load balancing. |

---

## Ways a Hacker Can Slip In

| # | Attack Vector | Difficulty | Damage |
|---|--------------|------------|--------|
| 1 | **Direct URL access** — navigate to `/admin-dashboard` | Trivial | Full admin control |
| 2 | **Unauthenticated API calls** — `curl` any endpoint | Trivial | Create/edit/delete all data |
| 3 | **Stored XSS** — inject `<script>` tags via event titles, notice content, faculty names | Easy | Steal cookies, redirect users, deface site |
| 4 | **Payload bomb** — POST a 500MB JSON body | Easy | Server crashes (OOM) |
| 5 | **Data wipe** — loop DELETE on all endpoints | Easy | All events, notices, faculty deleted |
| 6 | **Race condition exploit** — rapid concurrent writes | Medium | Data corruption in JSON files |
| 7 | **Path traversal** — if file upload is ever added without validation | Medium | Read/write arbitrary server files |
| 8 | **Credential stuffing** — hardcoded `admin123` in public repo | Trivial | If auth is ever re-enabled, password is already known |
| 9 | **CORS abuse** — malicious site makes API requests on behalf of a visitor | Easy | Data theft, unauthorized mutations |
| 10 | **DoS via sync I/O** — flood requests to block the event loop | Easy | Server becomes unresponsive |

---

## Ways to Prevent Attacks and Crashes

| # | Prevention | How to implement |
|---|-----------|-----------------|
| 1 | **Add JWT authentication** | `npm install jsonwebtoken bcrypt` — hash passwords, issue tokens on login, verify tokens via middleware on all write routes |
| 2 | **Add route guards on frontend** | Create `<ProtectedRoute>` component that checks for valid token in localStorage/context before rendering dashboards |
| 3 | **Validate all inputs** | `npm install express-validator` — define schemas for every endpoint, reject malformed data |
| 4 | **Sanitize HTML** | `npm install dompurify` (frontend) + `sanitize-html` (backend) — strip `<script>` tags from all user inputs |
| 5 | **Restrict CORS** | `app.use(cors({ origin: ['https://yourdomain.com'], credentials: true }))` |
| 6 | **Add rate limiting** | `npm install express-rate-limit` — limit login attempts to 5/min, write operations to 30/min |
| 7 | **Set payload size limit** | `app.use(express.json({ limit: '100kb' }))` |
| 8 | **Add Helmet** | `npm install helmet` — sets security headers (CSP, X-Frame-Options, HSTS, etc.) |
| 9 | **Use HTTPS** | Get a TLS certificate (Let's Encrypt is free). Never serve over plain HTTP in production. |
| 10 | **Add error boundaries** | Wrap route components in React `<ErrorBoundary>` to catch crashes gracefully |
| 11 | **Implement file locking** | Use `proper-lockfile` or switch to SQLite/PostgreSQL to prevent race conditions |
| 12 | **Remove hardcoded credentials** | Delete the `/api/login` and `/api/admin-login` routes. Use environment variables for any secrets. |
| 13 | **Add logging** | `npm install morgan` — log all requests. Use `winston` for structured logs with timestamps. |
| 14 | **Set up backups** | Automated daily JSON file copies, or use a database with built-in backup tools. |

---

## Additional Improvements

| # | Improvement | Priority |
|---|------------|----------|
| 1 | **React Error Boundaries** — prevent full-page crashes | High |
| 2 | **Loading skeletons** — show placeholder UI while data loads instead of blank space | Medium |
| 3 | **Toast notifications** — confirm saves/deletes with feedback messages | Medium |
| 4 | **Responsive image optimization** — use `<picture>` with WebP/AVIF + srcset for different screen sizes | Medium |
| 5 | **Sitemap.xml generation** — for better SEO / Google indexing | Low |
| 6 | **robots.txt** — control crawler access | Low |
| 7 | **Content Security Policy** — via meta tag or Helmet | High |
| 8 | **Audit logging** — track who changed what and when | Medium |
| 9 | **Auto-save / draft system** — prevent data loss while editing in dashboards | Low |
| 10 | **Dark mode for admin panel** — dashboard may not fully respect dark mode | Low |
| 11 | **Keyboard navigation** — full keyboard accessibility for all interactive elements | Medium |
| 12 | **Print stylesheet** — notices and events should be printable | Low |

---

## Current Problems and Their Solutions

### Problem 1: No authentication at all
- **Quick fix**: Add a simple password gate — store a bcrypt hash in `.env`, check it on login, set a cookie/localStorage flag, check it in a `<ProtectedRoute>` wrapper.
- **Best solution**: JWT with refresh tokens, bcrypt-hashed passwords in a database, auth middleware on all protected API routes, `<ProtectedRoute>` on frontend.

### Problem 2: JSON file storage is fragile
- **Quick fix**: Add file-level locking with `proper-lockfile` + async I/O + daily backups.
- **Best solution**: Migrate to **SQLite** (zero-config, single-file database, supports transactions and concurrent reads). Use `better-sqlite3` or `knex.js`. Even better: PostgreSQL via Supabase (already a dependency).

### Problem 3: No input validation
- **Quick fix**: Add `express.json({ limit: '100kb' })` and basic field checks (`if (!title) return res.status(400)...`).
- **Best solution**: Use `zod` or `joi` to define schemas for every endpoint. Validate and strip unknown fields before storing.

### Problem 4: XSS vulnerability
- **Quick fix**: Escape HTML on the backend before storage: `title.replace(/</g, '&lt;')`.
- **Best solution**: Use `DOMPurify` on the frontend when rendering user content + `sanitize-html` on the backend before saving.

### Problem 5: Site doesn't work on GitHub Pages (no backend)
- **Quick fix**: Use the static data files in `src/data/` as fallback when API calls fail (some pages already do this).
- **Best solution**: Deploy the backend separately (Railway, Render, Fly.io — all have free tiers). Or use Supabase as the backend (already in dependencies) — it gives you a database + REST API + auth for free.

### Problem 6: 1.4MB VC photo tanks page load
- **Quick fix**: Compress with squoosh.app → convert to AVIF/WebP (would be ~150-200KB).
- **Best solution**: Use responsive images with `srcset` and serve different sizes for mobile/desktop. Lazy-load below-fold images with `loading="lazy"`.

### Problem 7: 342KB JavaScript bundle (all pages loaded at once)
- **Quick fix**: Add `React.lazy()` imports for each page.
- **Best solution**: Code-split by route + configure Vite `manualChunks` to separate vendor libraries into a cacheable chunk.

### Problem 8: Monolithic 4,300-line CSS
- **Quick fix**: Add section markers and a table of contents comment at the top for navigation.
- **Best solution**: Migrate to CSS Modules (`.module.css` per component) or Tailwind CSS. Vite supports CSS Modules out of the box.

### Problem 9: No error handling on frontend
- **Quick fix**: Add try/catch around all `fetch()` calls with user-friendly error messages.
- **Best solution**: Use a data-fetching library like `@tanstack/react-query` (TanStack Query) — handles loading, error, caching, refetching, and retry automatically.

### Problem 10: CORS is wide open
- **Quick fix**: `app.use(cors({ origin: 'http://localhost:5173' }))` for dev.
- **Best solution**: Set CORS origin from an environment variable. Use a whitelist of allowed domains. In production behind Nginx, CORS may not even be needed if frontend and API share the same domain.

---

## Priority Order (What to Fix First)

1. **Authentication + route guards** — this is the #1 risk
2. **Input validation + payload limits** — prevents XSS and crashes
3. **Rate limiting + Helmet** — basic server hardening
4. **Async file I/O + file locking** — prevents data loss
5. **Lazy loading + image compression** — performance wins
6. **Database migration** — long-term stability
7. **Everything else** — incremental improvements
