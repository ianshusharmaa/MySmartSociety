import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-hero" style={{ backgroundImage: 'url(/welcomepage.jpg)' }}>
      <div className="welcome-overlay">
        <button className="welcome-cta" onClick={() => navigate('/login')}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
