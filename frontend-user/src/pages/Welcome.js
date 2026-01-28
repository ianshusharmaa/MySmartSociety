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
          <p className="lead">Welcome to your smart society management system. Handle complaints, permissions, maintenance requests, and stay updated with all society announcements - all in one platform.</p>
          <div className="welcome-actions">
            <Link className="btn btn-primary" to="/login">Resident Login</Link>
            <a className="btn btn-ghost" href="http://localhost:3001/login" target="_blank" rel="noreferrer">Admin Panel</a>
          </div>
        </div>
      </div>

      <div className="welcome-grid">
        <div className="welcome-card">
          <div className="card-icon">📋</div>
          <h3>Manage Complaints</h3>
          <p>Easily report maintenance issues, electrical problems, water supply issues, and more. Track status in real-time.</p>
        </div>
        <div className="welcome-card">
          <div className="card-icon">📄</div>
          <h3>Request Permissions</h3>
          <p>Submit permission requests for guests, guests stays, events, and renovations. Get instant approvals from admins.</p>
        </div>
        <div className="welcome-card">
          <div className="card-icon">🔧</div>
          <h3>Maintenance Updates</h3>
          <p>Stay informed about building maintenance schedules, emergency repairs, and facility updates.</p>
        </div>
        <div className="welcome-card">
          <div className="card-icon">📢</div>
          <h3>Announcements</h3>
          <p>Receive important notices, society events, meetings, and updates from the building administration.</p>
        </div>
        <div className="welcome-card">
          <div className="card-icon">📱</div>
          <h3>Easy Access</h3>
          <p>Access all society information anytime, anywhere. View your profile, history, and pending requests.</p>
        </div>
        <div className="welcome-card">
          <div className="card-icon">✅</div>
          <h3>Secure & Reliable</h3>
          <p>Your data is secure with role-based access control and encrypted communications.</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
