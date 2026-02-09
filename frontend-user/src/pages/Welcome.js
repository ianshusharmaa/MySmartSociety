import React from 'react';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import BuildIcon from '@mui/icons-material/Build';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LaunchIcon from '@mui/icons-material/Launch';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <AssignmentIcon fontSize="large" />, title: 'Complaints', desc: 'Report & track issues easily', color: '#ef4444' },
    { icon: <DescriptionIcon fontSize="large" />, title: 'Permissions', desc: 'Request & manage access', color: '#f59e0b' },
    { icon: <BuildIcon fontSize="large" />, title: 'Maintenance', desc: 'Schedule & monitor requests', color: '#3b82f6' },
    { icon: <NotificationsIcon fontSize="large" />, title: 'Notices', desc: 'Stay updated with news', color: '#8b5cf6' },
    { icon: <SecurityIcon fontSize="large" />, title: 'Secure', desc: 'Protected & encrypted', color: '#10b981' },
  ];

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-header">
          <div className="welcome-header-title">
            <ApartmentIcon className="welcome-header-icon" />
            <h1 className="welcome-header-text">MySmartSociety</h1>
          </div>
          <h2 className="welcome-subtitle">Manage Everything in One Place</h2>
          <p className="welcome-description">
            Handle complaints, permissions, maintenance & stay updated with your residential community
          </p>

          <div className="welcome-actions">
            <button className="welcome-btn-resident" onClick={() => navigate('/login')}>
              <DashboardIcon />
              Resident Login
            </button>
            <a className="welcome-btn-admin" href="http://localhost:3001/login" target="_blank" rel="noreferrer">
              Admin Panel
              <LaunchIcon />
            </a>
          </div>
        </div>

        <div className="welcome-features">
          {features.map((feature, index) => (
            <div key={index} className="welcome-feature-card">
              <div className="welcome-feature-content">
                <div className="welcome-feature-icon" style={{ backgroundColor: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className="welcome-feature-title">{feature.title}</h3>
                <p className="welcome-feature-desc">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="welcome-footer">
          <span className="welcome-footer-copyright">
            © 2026 MySmartSociety | All Rights Reserved
          </span>
          <span className="welcome-footer-credit">Developed by Anshu Sharma</span>
          <span className="welcome-footer-email">anshukumar.sharma.btechcse@ghrua.edu.in</span>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
