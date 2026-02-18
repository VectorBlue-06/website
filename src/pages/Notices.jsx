import { useState, useEffect } from 'react';
import { Bell, Calendar, Tag, AlertTriangle, Info, Search, Filter } from 'lucide-react';

const categories = ['All', 'Academic', 'Events', 'Admissions', 'Results'];

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch('/api/notices');
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error('Error fetching notices:', error);
      // Fallback to static data if needed
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = notices.filter((notice) => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="notices-page">
        <section className="page-hero">
          <div className="container">
            <span className="section-badge">Stay Updated</span>
            <h1 className="page-hero-title">Notices & Announcements</h1>
            <p className="page-hero-desc">Loading notices...</p>
          </div>
        </section>
      </div>
    );
  }

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
          </div>

          {/* Notices List */}
          <div className="notices-list">
            {filtered.map((notice) => (
              <div key={notice.id} className="notice-card priority-normal">
                <div className="notice-header">
                  <div className="notice-meta">
                    <span className="notice-category"><Tag size={12} /> Academic</span>
                    <span className="notice-date"><Calendar size={12} /> {notice.date}</span>
                  </div>
                </div>
                <h3>{notice.title}</h3>
                <p>{notice.description}</p>
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
            <p>Notices are managed through the teacher dashboard.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
