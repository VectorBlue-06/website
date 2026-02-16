import { useState } from 'react';
import { Bell, Calendar, Tag, AlertTriangle, Info, Search, Filter } from 'lucide-react';
import './Notices.css';

// Static notices - will be replaced with Supabase data later
const staticNotices = [
  {
    id: 1, title: 'Semester Examination Schedule Released', date: 'Jul 21, 2025',
    category: 'Academic', priority: 'urgent',
    content: 'The semester examination schedule for all departments has been released. Students are advised to check the examination cell notice board for detailed date sheets.',
  },
  {
    id: 2, title: 'Fee Payment Deadline Extended', date: 'Jul 20, 2025',
    category: 'Academic', priority: 'high',
    content: 'The fee payment deadline has been extended to July 30, 2025. Students are requested to complete their fee payment before the deadline to avoid late fees.',
  },
  {
    id: 3, title: 'Library Renovation Notice', date: 'Jul 18, 2025',
    category: 'Academic', priority: 'normal',
    content: 'The library will remain closed from July 25-30, 2025 for renovation work. Digital resources will remain accessible online.',
  },
  {
    id: 4, title: 'New Course Registration Opens', date: 'Jul 18, 2025',
    category: 'Academic', priority: 'normal',
    content: 'Online course registration for the new semester is now open. Students can register through the student portal.',
  },
  {
    id: 5, title: 'Tech Fest 2025', date: 'Jul 15, 2025',
    category: 'Events', priority: 'normal',
    content: 'SoET Tech Fest 2025 will be held from August 15-17. Prize pool of ₹2 Lakhs. Register now to participate in various competitions.',
  },
  {
    id: 6, title: 'M.Tech Admission Process Started', date: 'Jul 10, 2025',
    category: 'Admissions', priority: 'normal',
    content: 'M.Tech admission process for new session has started. Deadline for application is August 10, 2025.',
  },
  {
    id: 7, title: 'Industry Collaboration Program', date: 'Jul 8, 2025',
    category: 'Academic', priority: 'normal',
    content: '15+ partner companies joining our industry collaboration program. Students can benefit from internships and training.',
  },
  {
    id: 8, title: 'Semester Results Published', date: 'Jul 5, 2025',
    category: 'Results', priority: 'normal',
    content: 'Results for the previous semester have been published with a 95% pass rate. Students can check results on the university portal.',
  },
  {
    id: 9, title: 'Inter-Department Sports Meet', date: 'Jul 1, 2025',
    category: 'Events', priority: 'normal',
    content: 'Annual inter-department sports meet scheduled for July 28-30. Registrations open for all students.',
  },
];

const categories = ['All', 'Academic', 'Events', 'Admissions', 'Results'];

export default function Notices() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = staticNotices.filter((notice) => {
    const matchesCat = selectedCategory === 'All' || notice.category === selectedCategory;
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="notices-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Stay Updated</span>
          <h1 className="page-hero-title">Notices & Announcements</h1>
          <p className="page-hero-desc">
            Important updates, news, and announcements from SoET.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div className="notices-filters">
            <div className="search-bar">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="dept-filters">
              <Filter size={16} />
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Notices List */}
          <div className="notices-list">
            {filtered.map((notice) => (
              <div key={notice.id} className={`notice-card priority-${notice.priority}`}>
                <div className="notice-header">
                  <div className="notice-meta">
                    {notice.priority === 'urgent' && <span className="priority-badge urgent"><AlertTriangle size={12} /> Urgent</span>}
                    {notice.priority === 'high' && <span className="priority-badge high"><Info size={12} /> Important</span>}
                    <span className="notice-category"><Tag size={12} /> {notice.category}</span>
                    <span className="notice-date"><Calendar size={12} /> {notice.date}</span>
                  </div>
                </div>
                <h3>{notice.title}</h3>
                <p>{notice.content}</p>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="no-results">
              <Bell size={48} style={{ color: 'var(--color-gray-300)', marginBottom: '1rem' }} />
              <p>No announcements found.</p>
            </div>
          )}

          <div className="notices-note">
            <Info size={16} />
            <p>Notices are fetched dynamically. Connect Supabase for live updates.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
