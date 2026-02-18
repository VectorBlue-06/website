import { useState } from 'react';
import { Users, Phone, BookOpen, Search, Filter } from 'lucide-react';
import { faculty, departments } from '../data/faculty';
import { useRevealOnScroll } from '../lib/hooks';

export default function Faculty() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const pageRef = useRevealOnScroll();

  const filtered = faculty.filter((f) => {
    const matchesDept = selectedDept === 'All' || f.department === selectedDept;
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="faculty-page" ref={pageRef}>
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Our Team</span>
          <h1 className="page-hero-title">Faculty Directory</h1>
          <p className="page-hero-desc">
            Meet our experienced faculty members dedicated to engineering education.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div className="faculty-filters">
            <div className="search-bar">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search faculty by name or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="dept-filters">
              <Filter size={16} />
              {departments.map((dept) => (
                <button
                  key={dept}
                  className={`filter-btn ${selectedDept === dept ? 'active' : ''}`}
                  onClick={() => setSelectedDept(dept)}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Faculty Grid */}
          <div className="faculty-grid">
            {filtered.map((member, i) => (
              <div key={i} className="faculty-card">
                <div className="faculty-avatar">
                  <Users size={28} />
                </div>
                <div className="faculty-info">
                  <h4>{member.name}</h4>
                  <span className="faculty-dept">{member.department}</span>
                  <div className="faculty-details">
                    <span><BookOpen size={13} /> {member.qualification}</span>
                    <span><Users size={13} /> {member.experience}</span>
                    <span><Phone size={13} /> {member.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="no-results">
              <p>No faculty members found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
