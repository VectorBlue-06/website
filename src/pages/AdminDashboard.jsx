import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Settings, Layout, Users, BookOpen, Bell, Briefcase, GraduationCap, Calendar, Phone, UserPlus, Award } from 'lucide-react';
import { CrudManager } from '../components/CrudManager';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('contacts');

  const tabs = [
    { id: 'contacts', label: 'Contact & Info', icon: <Phone size={16} /> },
    { id: 'stats', label: 'Stats', icon: <Layout size={16} /> },
    { id: 'events', label: 'Events', icon: <BookOpen size={16} /> },
    { id: 'notices', label: 'Notices', icon: <Bell size={16} /> },
    { id: 'timetable', label: 'Timetable', icon: <Calendar size={16} /> },
    { id: 'faculty', label: 'Faculty', icon: <Users size={16} /> },
    { id: 'placements', label: 'Placements', icon: <Briefcase size={16} /> },
    { id: 'programs', label: 'Programs', icon: <GraduationCap size={16} /> },
    { id: 'societies', label: 'Societies', icon: <Award size={16} /> },
    { id: 'students', label: 'Students', icon: <UserPlus size={16} /> },
  ];

  return (
    <div className="dashboard-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Admin Panel</span>
          <h1 className="page-hero-title">Admin Dashboard</h1>
          <p className="page-hero-desc">
            Manage all website content, data, and settings.
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
            {activeTab === 'contacts' && <ContactInfoEditor />}
            {activeTab === 'stats' && <StatsEditor />}
            {activeTab === 'events' && <CrudManager type="events" fields={eventFields} />}
            {activeTab === 'notices' && <CrudManager type="notices" fields={noticeFields} />}
            {activeTab === 'timetable' && <CrudManager type="timetable" fields={timetableFields} />}
            {activeTab === 'faculty' && <CrudManager type="faculty" fields={facultyFields} />}
            {activeTab === 'placements' && <CrudManager type="placements" fields={placementFields} />}
            {activeTab === 'programs' && <CrudManager type="programs" fields={programFields} />}
            {activeTab === 'societies' && <CrudManager type="societies" fields={societyFields} />}
            {activeTab === 'students' && <CrudManager type="students" fields={studentFields} />}
          </div>
        </div>
      </section>
    </div>
  );
}

const eventFields = [
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea', required: true },
  { key: 'date', label: 'Date', type: 'date', required: true },
  { key: 'type', label: 'Category', type: 'select', options: ['academic', 'cultural', 'social'], required: true },
  { key: 'participants', label: 'Participants', type: 'text' },
];

const noticeFields = [
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea', required: true },
  { key: 'date', label: 'Date', type: 'date', required: true },
  { key: 'priority', label: 'Priority', type: 'select', options: ['normal', 'high', 'urgent'], required: true },
  { key: 'category', label: 'Category', type: 'select', options: ['academic', 'administrative', 'examination', 'general'] },
];

const facultyFields = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'department', label: 'Department', type: 'select', options: ['Electronics & Communication', 'Electronics & Computer Science', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Computer Science', 'Engineering Mathematics', 'Environment Science', 'Agricultural Engineering'], required: true },
  { key: 'qualification', label: 'Qualification', type: 'text', required: true },
  { key: 'experience', label: 'Experience', type: 'text' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'designation', label: 'Designation', type: 'text' },
  { key: 'expertise', label: 'Expertise', type: 'text' },
];

const placementFields = [
  { key: 'name', label: 'Student Name', type: 'text', required: true },
  { key: 'branch', label: 'Branch', type: 'text', required: true },
  { key: 'company', label: 'Company', type: 'text', required: true },
  { key: 'tag', label: 'Tag', type: 'select', options: ['Premium', 'Corporate', 'PSU', 'Government', 'IT Sector', 'MNC'] },
];

const programFields = [
  { key: 'name', label: 'Program Name', type: 'text', required: true },
  { key: 'shortName', label: 'Short Name', type: 'text', required: true },
  { key: 'intake', label: 'Intake', type: 'number', required: true },
  { key: 'duration', label: 'Duration', type: 'text', required: true },
  { key: 'eligibility', label: 'Eligibility', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
];

const timetableFields = [
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'department', label: 'Department', type: 'select', options: ['Electronics & Communication', 'Electronics & Computer Science', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Computer Science', 'Agricultural Engineering'], required: true },
  { key: 'semester', label: 'Semester', type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8'], required: true },
  { key: 'academicYear', label: 'Academic Year', type: 'text', required: true },
  { key: 'description', label: 'Details / Notes', type: 'textarea' },
];

const societyFields = [
  { key: 'name', label: 'Society Name', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea', required: true },
  { key: 'president', label: 'President / Head', type: 'text' },
  { key: 'contactEmail', label: 'Contact Email', type: 'text' },
  { key: 'contactPhone', label: 'Contact Phone', type: 'text' },
  { key: 'category', label: 'Category', type: 'select', options: ['Technical', 'Cultural', 'Social', 'Sports', 'Literary', 'Other'] },
];

const studentFields = [
  { key: 'name', label: 'Full Name', type: 'text', required: true },
  { key: 'enrollmentNo', label: 'Enrollment No.', type: 'text', required: true },
  { key: 'branch', label: 'Branch', type: 'select', options: ['Electronics & Communication', 'Electronics & Computer Science', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Computer Science', 'Agricultural Engineering'], required: true },
  { key: 'semester', label: 'Current Semester', type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8'] },
  { key: 'year', label: 'Admission Year', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'phone', label: 'Phone', type: 'text' },
];

function ContactInfoEditor() {
  const [config, setConfig] = useState({
    emailGeneral: 'soet@vikramuniv.ac.in',
    emailAdmissions: 'admissions.soet@vikramuniv.ac.in',
    phoneMain: '+91 734-2514271',
    phoneAdmission: '+91 734-2514272',
    phoneNCC: '+91 98765 43210',
    whatsapp: '',
    socialFacebook: '',
    socialInstagram: '',
    socialLinkedin: '',
    socialYoutube: '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/site-config');
      const data = await res.json();
      if (data && Object.keys(data).length > 0) setConfig(prev => ({ ...prev, ...data }));
    } catch (err) { /* use defaults */ }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/site-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      setMessage('Contact info saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error saving contact info.');
    }
    setSaving(false);
  };

  const configFields = [
    { key: 'emailGeneral', label: 'General Email' },
    { key: 'emailAdmissions', label: 'Admissions Email' },
    { key: 'phoneMain', label: 'Main Phone' },
    { key: 'phoneAdmission', label: 'Admission Phone' },
    { key: 'phoneNCC', label: 'NCC Contact Number' },
    { key: 'whatsapp', label: 'WhatsApp Number' },
    { key: 'socialFacebook', label: 'Facebook URL' },
    { key: 'socialInstagram', label: 'Instagram URL' },
    { key: 'socialLinkedin', label: 'LinkedIn URL' },
    { key: 'socialYoutube', label: 'YouTube URL' },
  ];

  return (
    <div className="manager-section">
      <div className="manager-header">
        <h3><Phone size={20} /> Contact & Info</h3>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      {message && <div className="admin-message">{message}</div>}
      <div className="admin-config-grid">
        {configFields.map((field) => (
          <div key={field.key} className="form-group">
            <label>{field.label}</label>
            <input
              type="text"
              value={config[field.key] || ''}
              onChange={(e) => setConfig({ ...config, [field.key]: e.target.value })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsEditor() {
  const [stats, setStats] = useState([
    { value: '2200+', label: 'Students' },
    { value: '30+', label: 'Expert Faculty' },
    { value: '11', label: 'Programs' },
    { value: '6', label: 'Departments' },
    { value: '250+', label: 'Computer Systems' },
  ]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) setStats(data);
    } catch (err) { /* use defaults */ }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stats),
      });
      setMessage('Stats saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error saving stats.');
    }
    setSaving(false);
  };

  const addStat = () => setStats([...stats, { value: '', label: '' }]);
  const removeStat = (index) => setStats(stats.filter((_, i) => i !== index));
  const updateStat = (index, field, value) => {
    const newStats = [...stats];
    newStats[index][field] = value;
    setStats(newStats);
  };

  return (
    <div className="manager-section">
      <div className="manager-header">
        <h3><Layout size={20} /> Website Stats</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-outline" onClick={addStat}>
            <Plus size={16} /> Add Stat
          </button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            <Save size={16} /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
      {message && <div className="admin-message">{message}</div>}
      <div className="items-list">
        {stats.map((stat, i) => (
          <div key={i} className="item-card">
            <div className="item-info">
              <div className="form-group">
                <label>Value</label>
                <input type="text" value={stat.value} onChange={(e) => updateStat(i, 'value', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Label</label>
                <input type="text" value={stat.label} onChange={(e) => updateStat(i, 'label', e.target.value)} />
              </div>
            </div>
            <div className="item-actions">
              <button onClick={() => removeStat(i)} title="Remove"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}