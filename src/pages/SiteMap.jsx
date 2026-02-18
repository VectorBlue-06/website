import { Link } from 'react-router-dom';
import './SiteMap.css';

const siteTree = [
  { path: '/', label: 'Home' },
  {
    path: '/about',
    label: 'About',
    children: [
      { path: '/about', label: 'About Us' },
      { path: '/vc-vision', label: "VC's Vision" },
      { path: '/alumni', label: 'Alumni & Placements' },
      { path: '/ncc', label: 'NCC' },
      { path: '/anti-ragging', label: 'Anti-Ragging' },
    ],
  },
  {
    path: '/departments',
    label: 'Academics',
    children: [
      { path: '/departments', label: 'Departments' },
      { path: '/faculty', label: 'Faculty' },
      { path: '/admissions', label: 'Admissions' },
    ],
  },
  {
    path: '/societies',
    label: 'Campus Life',
    children: [
      { path: '/societies', label: 'Societies' },
      { path: '/events', label: 'Events' },
      { path: '/notices', label: 'Notices' },
      { path: '/contact', label: 'Contact' },
    ],
  },
  {
    path: '/student-login',
    label: 'Portals',
    children: [
      { path: '/student-login', label: 'Student Login' },
      { path: '/teacher-login', label: 'Teacher Login' },
    ],
  },
];

export default function SiteMap() {
  const renderNode = (node) => (
    <li key={node.path} className="sitemap-node">
      <Link to={node.path} className="sitemap-link">
        {node.label}
      </Link>
      {node.children && (
        <ul className="sitemap-children">
          {node.children.map(renderNode)}
        </ul>
      )}
    </li>
  );

  return (
    <div className="sitemap-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Navigation</span>
          <h1 className="page-hero-title">Site Map</h1>
          <p className="page-hero-desc">
            A tree view of every page and portal in one place.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sitemap-wrapper">
            <ul className="sitemap-tree">
              {siteTree.map(renderNode)}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}