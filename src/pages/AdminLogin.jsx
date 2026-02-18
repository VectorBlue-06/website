import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/admin-dashboard');
  }, [navigate]);

  return (
    <div className="login-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Admin Access</span>
          <h1 className="page-hero-title">Admin Login</h1>
          <p className="page-hero-desc">
            Redirecting to dashboard...
          </p>
        </div>
      </section>
    </div>
  );
}