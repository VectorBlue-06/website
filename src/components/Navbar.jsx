import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Mail, Phone, Menu, X, ChevronDown, ExternalLink } from 'lucide-react';
import { siteConfig, contactInfo, externalLinks } from '../data/siteData';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { path: '/', label: 'Home' },
  {
    label: 'About',
    children: [
      { path: '/about', label: 'About Us' },
      { path: '/vc-vision', label: 'VC\'s Vision' },
      { path: '/placements', label: 'Alumni & Placements' },
      { path: '/ncc', label: 'NCC' },
      { path: '/anti-ragging', label: 'Anti-Ragging' },
    ],
  },
  {
    label: 'Academics',
    children: [
      { path: '/departments', label: 'Departments' },
      { path: '/faculty', label: 'Faculty' },
      { path: '/admissions', label: 'Admissions' },
    ],
  },
  { path: '/societies', label: 'Societies' },
  { path: '/events', label: 'Events' },
  { path: '/notices', label: 'Notices' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <>
      {/* Top Utility Bar */}
      <div className="utility-bar">
        <div className="container utility-bar-inner">
          <div className="utility-left">
            <a href={`mailto:${contactInfo.emails.general}`} className="utility-link">
              <Mail size={14} /> {contactInfo.emails.general}
            </a>
            <a href={`tel:${contactInfo.phones.main}`} className="utility-link">
              <Phone size={14} /> {contactInfo.phones.main}
            </a>
          </div>
          <div className="utility-right">
            <a href="/student-login" className="utility-link">
              Student Login
            </a>
            <a href="/teacher-login" className="utility-link">
              Teacher Login
            </a>
            <a href="/admin-login" className="utility-link">
              Admin Login
            </a>
            <a href={externalLinks.admissionPortal} target="_blank" rel="noopener noreferrer" className="utility-link">
              Admissions <ExternalLink size={12} />
            </a>
            <a href={externalLinks.universityPortal} target="_blank" rel="noopener noreferrer" className="utility-link">
              University Portal <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" className="navbar-brand">
            <img
              src="/images/vikram-university-Photoroom.png"
              alt="SoET Logo"
              className="brand-logo"
            />
            <div className="brand-text">
              <span className="brand-name">{siteConfig.name}</span>
              <span className="brand-sub">{siteConfig.university.split(',')[0]}</span>
            </div>
          </Link>

          <nav className={`navbar-nav ${isMobileOpen ? 'nav-open' : ''}`}>
            {navItems.map((item, i) =>
              item.children ? (
                <div
                  key={i}
                  className={`nav-dropdown ${openDropdown === i ? 'dropdown-open' : ''}`}
                  onMouseEnter={() => setOpenDropdown(i)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="nav-link dropdown-toggle"
                    onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                  >
                    {item.label} <ChevronDown size={16} />
                  </button>
                  <div className="dropdown-menu">
                    {item.children.map((child) => (
                      <NavLink key={child.path} to={child.path} className="dropdown-item">
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink key={item.path} to={item.path} className="nav-link" end={item.path === '/'}>
                  {item.label}
                </NavLink>
              )
            )}
            <a
              href={externalLinks.admissionPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary nav-cta"
            >
              Apply Now
            </a>
          </nav>

          <div className="navbar-actions">
            <ThemeToggle />
            <button
              className="mobile-toggle"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
