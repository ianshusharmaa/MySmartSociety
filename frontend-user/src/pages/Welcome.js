import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-hero">
        <div className="welcome-copy">
          <p className="eyebrow">Smart Society</p>
          <h1>Manage Everything in One Place</h1>
          <p className="lead">Handle complaints, permissions, maintenance & stay updated</p>
          <div className="welcome-actions">
            <Link className="btn btn-primary" to="/login">Resident Login</Link>
            <a className="btn btn-ghost" href="http://localhost:3001/login" target="_blank" rel="noreferrer">Admin Panel</a>
          </div>
        </div>
      </div>

      <div className="welcome-grid">
        <div className="welcome-card">
          <div className="card-icon">📋</div>
          <h3>Complaints</h3>
          <p>Report & track issues easily</p>
        </div>
        <div className="welcome-card">
          <div className="card-icon">📄</div>
          <h3>Permissions</h3>
          <p>Request & manage access</p>
        </div>
        <div className="welcome-card">
          <div className="card-icon">🔧</div>
          <h3>Maintenance</h3>
          <p>Schedule & monitor requests</p>
        </div>
        <div className="welcome-card">
          <div className="card-icon">📢</div>
          <h3>Notices</h3>
          <p>Stay updated with news</p>
        </div>
        <div className="welcome-card">
          <div className="card-icon">📱</div>
          <h3>Easy Access</h3>
          <p>Everything in one app</p>
        </div>
        <div className="welcome-card">
          <div className="card-icon">✅</div>
          <h3>Secure</h3>
          <p>Protected & encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
