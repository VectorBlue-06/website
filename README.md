# SOET College Website

A modern, responsive website for the School of Engineering and Technology (SOET) built with React, Vite, and Supabase.

## Features

- **Dark/Light Mode Toggle**: Switch between dark and light themes with persistent storage
- **Effects Toggle**: Enable/disable visual effects like glassmorphism and blur
- **Responsive Design**: Optimized for all device sizes
- **Modern UI**: Clean, professional design with smooth animations
- **Fast Performance**: Built with Vite for lightning-fast development and builds
- **SEO Friendly**: Proper meta tags and semantic HTML

## Tech Stack

- **Frontend**: React 19, React Router DOM
- **Build Tool**: Vite
- **Styling**: CSS Variables with custom design system
- **Icons**: Lucide React, React Icons
- **Backend**: Supabase (for data management)
- **Deployment**: Ready for static hosting (Vercel, Netlify, etc.)

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main layout wrapper
│   ├── Navbar.jsx      # Navigation bar
│   ├── Footer.jsx      # Footer component
│   ├── ThemeToggle.jsx # Dark/light mode toggle
│   └── EffectsToggle.jsx # Effects on/off toggle
├── context/            # React contexts
│   ├── ThemeContext.jsx
│   └── EffectsContext.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Departments.jsx
│   ├── Faculty.jsx
│   ├── Admissions.jsx
│   ├── Notices.jsx
│   ├── Contact.jsx
│   └── Events.jsx
├── styles/             # Global styles and CSS
│   └── global.css
├── data/               # Static data files
├── lib/                # Utility libraries
└── assets/             # Static assets
```

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory for Supabase configuration:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Theme System

The app uses CSS custom properties for theming. Themes are stored in localStorage and applied via data attributes on the root element.

- Light mode: `data-theme="light"`
- Dark mode: `data-theme="dark"`

### Effects System

Visual effects can be toggled on/off:

- Effects on: `data-effects="on"`
- Effects off: `data-effects="off"`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
