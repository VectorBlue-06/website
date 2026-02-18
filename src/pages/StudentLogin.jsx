import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    // For debugging, directly navigate to dashboard
    navigate('/student-dashboard');
  }, [navigate]);

  return (
    <div className="login-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Access</span>
          <h1 className="page-hero-title">Student Login</h1>
          <p className="page-hero-desc">
            Redirecting to dashboard...
          </p>
        </div>
      </section>
    </div>
  );
}