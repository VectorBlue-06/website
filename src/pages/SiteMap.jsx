import { Link } from 'react-router-dom';

export default function SiteMap() {
  const pages = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/ncc', label: 'NCC' },
    { path: '/vc-vision', label: 'VC\'s Vision' },
    { path: '/departments', label: 'Departments' },
    { path: '/faculty', label: 'Faculty' },
    { path: '/admissions', label: 'Admissions' },
    { path: '/societies', label: 'Societies' },
    { path: '/events', label: 'Events' },
    { path: '/notices', label: 'Notices' },
    { path: '/contact', label: 'Contact' },
    { path: '/student-login', label: 'Student Login' },
    { path: '/teacher-login', label: 'Teacher Login' },
  ];

  return (
    <div className="sitemap-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Navigation</span>
          <h1 className="page-hero-title">Site Map</h1>
          <p className="page-hero-desc">
            Complete overview of all pages on our website.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sitemap-grid">
            {pages.map(page => (
              <Link key={page.path} to={page.path} className="sitemap-link">
                {page.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}