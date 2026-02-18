import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('adminLoggedIn', 'true');
        navigate('/admin-dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <div className="login-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Admin Access</span>
          <h1 className="page-hero-title">Admin Login</h1>
          <p className="page-hero-desc">
            Enter credentials to access admin dashboard.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </section>
    </div>
  );
}