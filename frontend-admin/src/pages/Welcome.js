import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-text">
          <h1 className="welcome-title">Welcome to MySmartSociety</h1>
          <p className="welcome-subtitle">Building Communities, Creating Harmony</p>
          <p className="welcome-description">
            Manage your residential community with ease. Handle complaints, maintenance payments, 
            permissions, notices, and events all in one place.
          </p>

          <div className="welcome-features">
            <div className="feature">
              <span className="feature-icon">📋</span>
              <span>Complaint Management</span>
            </div>
            <div className="feature">
              <span className="feature-icon">💰</span>
              <span>Maintenance Tracking</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🔑</span>
              <span>Permission System</span>
            </div>
            <div className="feature">
              <span className="feature-icon">📢</span>
              <span>Notices & Updates</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🎉</span>
              <span>Event Organization</span>
            </div>
            <div className="feature">
              <span className="feature-icon">👥</span>
              <span>Community Management</span>
            </div>
          </div>

          <div className="welcome-actions">
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/login')}
            >
              Admin Login
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => navigate('/register')}
            >
              New Registration
            </button>
          </div>
        </div>

        <div className="welcome-image">
          <img 
            src="https://www.livelaw.in/cms/wp-content/uploads/2018/06/Co-Operative-society.jpg" 
            alt="Happy community" 
            className="community-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
