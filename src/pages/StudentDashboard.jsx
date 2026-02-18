import { useState } from 'react';
import { BookOpen, Calendar, Users, FileText, Award, Bell } from 'lucide-react';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BookOpen size={16} /> },
    { id: 'notices', label: 'Notices', icon: <Bell size={16} /> },
    { id: 'events', label: 'Events', icon: <Calendar size={16} /> },
    { id: 'profile', label: 'Profile', icon: <Users size={16} /> },
  ];

  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Student Portal</h1>
          <p>Welcome back, Student!</p>
        </div>
      </header>

      <nav className="dashboard-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>

      <main className="dashboard-main">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'notices' && <NoticesTab />}
        {activeTab === 'events' && <EventsTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </main>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="overview-grid">
      <div className="stat-card">
        <div className="stat-icon">
          <BookOpen size={24} />
        </div>
        <div className="stat-content">
          <h3>Current Semester</h3>
          <p>7th Semester - B.Tech CSE</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <Award size={24} />
        </div>
        <div className="stat-content">
          <h3>CGPA</h3>
          <p>8.5</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <Calendar size={24} />
        </div>
        <div className="stat-content">
          <h3>Attendance</h3>
          <p>85%</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <FileText size={24} />
        </div>
        <div className="stat-content">
          <h3>Pending Assignments</h3>
          <p>3</p>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn">View Timetable</button>
          <button className="action-btn">Check Results</button>
          <button className="action-btn">Download Forms</button>
          <button className="action-btn">Contact Faculty</button>
        </div>
      </div>

      <div className="upcoming-events">
        <h3>Upcoming Events</h3>
        <div className="event-list">
          <div className="event-item">
            <div className="event-date">Dec 15</div>
            <div className="event-details">
              <h4>Technical Seminar</h4>
              <p>AI & Machine Learning</p>
            </div>
          </div>
          <div className="event-item">
            <div className="event-date">Dec 20</div>
            <div className="event-details">
              <h4>Project Submission</h4>
              <p>Final Year Project</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NoticesTab() {
  const notices = [
    { id: 1, title: 'Exam Schedule Released', date: '2024-12-01', priority: 'high' },
    { id: 2, title: 'Holiday Notice', date: '2024-11-28', priority: 'medium' },
    { id: 3, title: 'Library Timings Update', date: '2024-11-25', priority: 'low' },
  ];

  return (
    <div className="notices-section">
      <h2>Recent Notices</h2>
      <div className="notices-list">
        {notices.map(notice => (
          <div key={notice.id} className={`notice-card priority-${notice.priority}`}>
            <div className="notice-header">
              <h4>{notice.title}</h4>
              <span className="notice-date">{notice.date}</span>
            </div>
            <p>This is a sample notice content. More details would be displayed here.</p>
            <button className="read-more-btn">Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsTab() {
  const events = [
    { id: 1, title: 'Tech Fest 2024', date: '2024-12-15', type: 'Technical' },
    { id: 2, title: 'Cultural Night', date: '2024-12-18', type: 'Cultural' },
    { id: 3, title: 'Sports Meet', date: '2024-12-20', type: 'Sports' },
  ];

  return (
    <div className="events-section">
      <h2>Upcoming Events</h2>
      <div className="events-list">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-type">{event.type}</div>
            <h4>{event.title}</h4>
            <p className="event-date">{event.date}</p>
            <button className="register-btn">Register</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="profile-section">
      <div className="profile-header">
        <div className="profile-avatar">
          <Users size={48} />
        </div>
        <div className="profile-info">
          <h2>John Doe</h2>
          <p>B.Tech Computer Science & Engineering</p>
          <p>Roll No: CS2021001</p>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-group">
          <h3>Personal Information</h3>
          <div className="detail-item">
            <label>Email:</label>
            <span>john.doe@vikramuniv.ac.in</span>
          </div>
          <div className="detail-item">
            <label>Phone:</label>
            <span>+91 9876543210</span>
          </div>
          <div className="detail-item">
            <label>Address:</label>
            <span>Ujjain, Madhya Pradesh</span>
          </div>
        </div>

        <div className="detail-group">
          <h3>Academic Information</h3>
          <div className="detail-item">
            <label>Current Semester:</label>
            <span>7th Semester</span>
          </div>
          <div className="detail-item">
            <label>CGPA:</label>
            <span>8.5</span>
          </div>
          <div className="detail-item">
            <label>Branch:</label>
            <span>Computer Science & Engineering</span>
          </div>
        </div>
      </div>
    </div>
  );
}