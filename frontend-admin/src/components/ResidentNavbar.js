import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaHome, FaExclamationCircle, FaKey, FaMoneyBill, FaCalendar, FaBullhorn, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const ResidentNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-resident">
      <div className="navbar-shell">
        <div className="navbar-top">
          <Link to="/dashboard" className="navbar-brand">
            <span className="brand-icon">🏢</span>
            <div>
              <div className="brand-title">My Society</div>
              <div className="brand-subtitle">Resident Portal</div>
            </div>
          </Link>

          <div className="navbar-user">
            <div className="user-meta" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span className="user-name" style={{fontSize: '1.15rem', fontWeight: '700'}}>{user?.name}</span>
              <span className="user-role" style={{fontSize: '0.7rem', color: '#ffffff', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', backgroundColor: '#4f46e5', padding: '4px 10px', borderRadius: '12px', display: 'inline-block'}}>{user?.role}</span>
            </div>
            <button onClick={handleLogout} className="nav-link logout-btn">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        <div className="navbar-actions">
          <Link to="/dashboard" className="nav-link">
            <FaHome /> Dashboard
          </Link>
          <Link to="/complaints" className="nav-link">
            <FaExclamationCircle /> Complaints
          </Link>
          <Link to="/permissions" className="nav-link">
            <FaKey /> Permissions
          </Link>
          <Link to="/maintenance" className="nav-link">
            <FaMoneyBill /> Maintenance
          </Link>
          <Link to="/events" className="nav-link">
            <FaCalendar /> Events
          </Link>
          <Link to="/notices" className="nav-link">
            <FaBullhorn /> Notices
          </Link>
          <Link to="/profile" className="nav-link">
            <FaUser /> Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default ResidentNavbar;
