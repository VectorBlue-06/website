import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Save, Settings, Layout, Users, BookOpen, Bell, Briefcase, GraduationCap, X, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('siteConfig');

  useEffect(() => {
    if (!localStorage.getItem('adminLoggedIn')) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const tabs = [
    { id: 'siteConfig', label: 'Site Settings', icon: <Settings size={16} /> },
    { id: 'stats', label: 'Stats', icon: <Layout size={16} /> },
    { id: 'events', label: 'Events', icon: <BookOpen size={16} /> },
    { id: 'notices', label: 'Notices', icon: <Bell size={16} /> },
    { id: 'faculty', label: 'Faculty', icon: <Users size={16} /> },
    { id: 'placements', label: 'Placements', icon: <Briefcase size={16} /> },
    { id: 'programs', label: 'Programs', icon: <GraduationCap size={16} /> },
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
            {activeTab === 'siteConfig' && <SiteConfigEditor />}
            {activeTab === 'stats' && <StatsEditor />}
            {activeTab === 'events' && <CrudManager type="events" fields={eventFields} />}
            {activeTab === 'notices' && <CrudManager type="notices" fields={noticeFields} />}
            {activeTab === 'faculty' && <CrudManager type="faculty" fields={facultyFields} />}
            {activeTab === 'placements' && <CrudManager type="placements" fields={placementFields} />}
            {activeTab === 'programs' && <CrudManager type="programs" fields={programFields} />}
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

function SiteConfigEditor() {
  const [config, setConfig] = useState({
    name: 'SoET',
    fullName: 'School of Engineering and Technology',
    university: 'Samrat Vikramaditya Vishwavidyalaya, Ujjain',
    tagline: 'Empowering Innovation, Shaping Futures',
    approval: 'AICTE Approved',
    founded: 1957,
    soetEstablished: 2011,
    emailGeneral: 'soet@vikramuniv.ac.in',
    emailAdmissions: 'admissions.soet@vikramuniv.ac.in',
    phoneMain: '+91 734-2514271',
    phoneAdmission: '+91 734-2514272',
    address: 'School of Engineering and Technology, Vikram University, Ujjain, Madhya Pradesh - 456010, India',
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
      setMessage('Site configuration saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error saving configuration.');
    }
    setSaving(false);
  };

  const configFields = [
    { key: 'name', label: 'Site Short Name' },
    { key: 'fullName', label: 'Full Name' },
    { key: 'university', label: 'University Name' },
    { key: 'tagline', label: 'Tagline' },
    { key: 'approval', label: 'Approval Status' },
    { key: 'founded', label: 'University Founded Year' },
    { key: 'soetEstablished', label: 'SoET Established Year' },
    { key: 'emailGeneral', label: 'General Email' },
    { key: 'emailAdmissions', label: 'Admissions Email' },
    { key: 'phoneMain', label: 'Main Phone' },
    { key: 'phoneAdmission', label: 'Admission Phone' },
    { key: 'address', label: 'Full Address' },
  ];

  return (
    <div className="manager-section">
      <div className="manager-header">
        <h3><Settings size={20} /> Site Configuration</h3>
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

function CrudManager({ type, fields }) {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [type]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${type}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(`Error fetching ${type}:`, err);
      setItems([]);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await fetch(`/api/${type}/${id}`, { method: 'DELETE' });
      fetchItems();
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingItem(null);
    fetchItems();
  };

  const displayField = fields[0]?.key || 'title';
  const descField = fields.find(f => f.key === 'description' || f.key === 'department' || f.key === 'company')?.key;

  return (
    <div className="manager-section">
      <div className="manager-header">
        <h3>{type.charAt(0).toUpperCase() + type.slice(1)} Manager</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-outline" onClick={fetchItems}>
            <RefreshCw size={16} /> Refresh
          </button>
          <button className="btn btn-primary" onClick={() => { setEditingItem(null); setShowForm(true); }}>
            <Plus size={16} /> Add {type.slice(0, -1)}
          </button>
        </div>
      </div>

      {showForm && (
        <DynamicForm
          item={editingItem}
          type={type}
          fields={fields}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingItem(null); }}
        />
      )}

      {loading ? (
        <p>Loading {type}...</p>
      ) : (
        <div className="items-list">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <div className="item-info">
                <h4>{item[displayField] || item.title || item.name || 'Untitled'}</h4>
                {descField && <p>{item[descField]}</p>}
                {item.date && <span>{item.date}</span>}
                {item.type && <span style={{ marginLeft: '0.5rem' }}>{item.type}</span>}
              </div>
              <div className="item-actions">
                <button onClick={() => handleEdit(item)} title="Edit"><Edit size={16} /></button>
                <button onClick={() => handleDelete(item.id)} title="Delete"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {!items.length && <p>No {type} found. Click &quot;Add&quot; to create one.</p>}
        </div>
      )}
    </div>
  );
}

function DynamicForm({ item, type, fields, onSave, onCancel }) {
  const buildInitialData = () => {
    const data = {};
    fields.forEach(f => { data[f.key] = item?.[f.key] || ''; });
    return data;
  };

  const [formData, setFormData] = useState(buildInitialData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = item ? 'PUT' : 'POST';
      const url = item ? `/api/${type}/${item.id}` : `/api/${type}`;
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      onSave();
    } catch (err) {
      console.error('Error saving:', err);
    }
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4>{item ? 'Edit' : 'Add'} {type.slice(0, -1)}</h4>
        <button type="button" onClick={onCancel} style={{ cursor: 'pointer' }}><X size={20} /></button>
      </div>
      <div className="admin-config-grid">
        {fields.map((field) => (
          <div key={field.key} className="form-group">
            <label>{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                value={formData[field.key]}
                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                required={field.required}
              />
            ) : field.type === 'select' ? (
              <select
                value={formData[field.key]}
                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                required={field.required}
                style={{ padding: '0.65rem 0.85rem', border: '2px solid var(--border-color)', borderRadius: 'var(--radius-lg)', background: 'var(--surface-input)', color: 'var(--text-primary)' }}
              >
                <option value="">Select...</option>
                {field.options.map(opt => (
                  <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || 'text'}
                value={formData[field.key]}
                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                required={field.required}
              />
            )}
          </div>
        ))}
      </div>
      <div className="dashboard-page form-actions" style={{ marginTop: '1.5rem' }}>
        <button type="submit" className="btn btn-primary"><Save size={16} /> Save</button>
        <button type="button" onClick={onCancel} className="btn btn-outline">Cancel</button>
      </div>
    </form>
  );
}