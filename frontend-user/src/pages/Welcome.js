import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-hero">
        <div className="welcome-copy">
          <p className="eyebrow">Smart Society</p>
          <h1>Manage your home, payments, and permissions in one place.</h1>
          <p className="lead">Residents use the blue panel. Admins sign in to the violet panel. No more confusion.</p>
          <div className="welcome-actions">
            <Link className="btn btn-primary" to="/login">Resident Login</Link>
            <a className="btn btn-ghost" href="http://localhost:3001/login" target="_blank" rel="noreferrer">Open Admin Panel</a>
          </div>
          <div className="welcome-demo">
            <span>Resident demo: resident@society.com / resident123</span>
            <span>Admin demo: admin@society.com / admin123</span>
          </div>
        </div>
        <div className="welcome-illustration" aria-hidden="true">
          <img 
            src="https://www.livelaw.in/cms/wp-content/uploads/2018/06/Co-Operative-society.jpg"
            alt="Society Community"
            className="illustration-image"
          />
        </div>
      </div>

      <div className="welcome-grid">
        <div className="welcome-card">
          <h3>🏠 For Residents</h3>
          <p>Admin creates your account and shares credentials. Login with email and password provided.</p>
        </div>
        <div className="welcome-card">
          <h3>🔐 For Admins</h3>
          <p>Create resident accounts in the Admin Panel. Set credentials and share with residents.</p>
        </div>
        <div className="welcome-card">
          <h3>✅ Secure & Clear</h3>
          <p>Separate panels, role-based access, and instant login after credentials are set.</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
