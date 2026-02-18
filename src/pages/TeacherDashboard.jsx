import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload, FileText, Calendar, Users, BookOpen } from 'lucide-react';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab === 'events') {
      fetchEvents();
    } else if (activeTab === 'notices') {
      fetchNotices();
    } else if (activeTab === 'timetable') {
      fetchTimetable();
    } else if (activeTab === 'programs') {
      fetchPrograms();
    }
  }, [activeTab]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/notices');
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTimetable = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/timetable');
      const data = await response.json();
      setTimetable(data);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/programs');
      const data = await response.json();
      setPrograms(data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/events/${id}`, { method: 'DELETE' });
      setEvents(events.filter(e => e.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleDeleteNotice = async (id) => {
    try {
      await fetch(`/api/notices/${id}`, { method: 'DELETE' });
      setNotices(notices.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  const handleDeleteTimetable = async (id) => {
    try {
      await fetch(`/api/timetable/${id}`, { method: 'DELETE' });
      setTimetable(timetable.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting timetable entry:', error);
    }
  };

  const handleDeleteProgram = async (id) => {
    try {
      await fetch(`/api/programs/${id}`, { method: 'DELETE' });
      setPrograms(programs.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  };

  const tabs = [
    { id: 'events', label: 'Events', icon: <Calendar size={16} /> },
    { id: 'timetable', label: 'Timetable', icon: <FileText size={16} /> },
    { id: 'programs', label: 'Programs', icon: <BookOpen size={16} /> },
    { id: 'notices', label: 'Notices', icon: <Users size={16} /> },
  ];

  return (
    <div className="dashboard-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Admin Panel</span>
          <h1 className="page-hero-title">Teacher Dashboard</h1>
          <p className="page-hero-desc">
            Manage website content, events, timetables, and more.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="dashboard-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="dashboard-content">
            {activeTab === 'events' && <EventsManager events={events} loading={loading} onDelete={handleDelete} onRefresh={fetchEvents} />}
            {activeTab === 'timetable' && <TimetableManager />}
            {activeTab === 'programs' && <ProgramsManager />}
            {activeTab === 'notices' && <NoticesManager />}
          </div>
        </div>
      </section>
    </div>
  );
}

function EventsManager({ events, loading, onDelete, onRefresh }) {
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAdd = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    onRefresh();
  };

  return (
    <div className="manager-section">
      <div className="manager-header">
        <h3>Manage Events</h3>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Plus size={16} /> Add Event
        </button>
      </div>

      {showForm && (
        <EventForm
          event={editingEvent}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="items-list">
          {events.map(event => (
            <div key={event.id} className="item-card">
              <div className="item-info">
                <h4>{event.title}</h4>
                <p>{event.description}</p>
                <span>{event.date}</span>
              </div>
              <div className="item-actions">
                <button onClick={() => handleEdit(event)}><Edit size={16} /></button>
                <button onClick={() => onDelete(event.id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EventForm({ event, onSave, onCancel }) {
  const [formData, setFormData] = useState(event || {
    title: '',
    description: '',
    date: '',
    image: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = event ? 'PUT' : 'POST';
      const url = event ? `/api/events/${event.id}` : '/api/events';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      onSave();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Image URL</label>
        <input
          type="text"
          value={formData.image || ''}
          onChange={(e) => setFormData({...formData, image: e.target.value})}
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
      </div>
    </form>
  );
}

function TimetableManager() {
  return (
    <div className="manager-section">
      <div className="manager-header">
        <h3>Manage Timetable</h3>
        <button className="btn btn-primary">
          <Upload size={16} /> Upload PDF
        </button>
      </div>
      <p>Timetable management functionality will be implemented here.</p>
    </div>
  );
}

function ProgramsManager() {
  return (
    <div className="manager-section">
      <div className="manager-header">
        <h3>Manage Programs & Info</h3>
        <button className="btn btn-primary">
          <Plus size={16} /> Add Program
        </button>
      </div>
      <p>Programs management functionality will be implemented here.</p>
    </div>
  );
}

function NoticesManager() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);

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
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingNotice(null);
    setShowForm(true);
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/notices/${id}`, { method: 'DELETE' });
      setNotices(notices.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  const handleSave = () => {
    setShowForm(false);
    fetchNotices();
  };

  return (
    <div className="manager-section">
      <div className="manager-header">
        <h3>Manage Notices</h3>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Plus size={16} /> Add Notice
        </button>
      </div>

      {showForm && (
        <NoticeForm
          notice={editingNotice}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <p>Loading notices...</p>
      ) : (
        <div className="items-list">
          {notices.map(notice => (
            <div key={notice.id} className="item-card">
              <div className="item-info">
                <h4>{notice.title}</h4>
                <p>{notice.description}</p>
                <span>{notice.date}</span>
              </div>
              <div className="item-actions">
                <button onClick={() => handleEdit(notice)}><Edit size={16} /></button>
                <button onClick={() => handleDelete(notice.id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NoticeForm({ notice, onSave, onCancel }) {
  const [formData, setFormData] = useState(notice || {
    title: '',
    description: '',
    date: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = notice ? 'PUT' : 'POST';
      const url = notice ? `/api/notices/${notice.id}` : '/api/notices';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      onSave();
    } catch (error) {
      console.error('Error saving notice:', error);
    }
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
      </div>
    </form>
  );
}