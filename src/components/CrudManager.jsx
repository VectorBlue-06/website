import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, RefreshCw } from 'lucide-react';

export function CrudManager({ type, fields }) {
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
                <button onClick={() => { setEditingItem(item); setShowForm(true); }} title="Edit"><Edit size={16} /></button>
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

export function DynamicForm({ item, type, fields, onSave, onCancel }) {
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
