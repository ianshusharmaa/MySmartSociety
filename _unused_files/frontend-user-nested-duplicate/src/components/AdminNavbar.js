import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaHome, FaExclamationCircle, FaKey, FaMoneyBill, FaCalendar, FaBullhorn, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const AdminNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-admin">
      <div className="navbar-shell">
        <div className="navbar-top">
          <Link to="/admin/dashboard" className="navbar-brand">
            <span className="brand-icon">🏢</span>
            <div>
              <div className="brand-title">My Society</div>
              <div className="brand-subtitle">Admin Panel</div>
            </div>
          </Link>

          <div className="navbar-user">
            <div className="user-meta">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
            <button onClick={handleLogout} className="nav-link logout-btn">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        <div className="navbar-actions">
          <Link to="/admin/dashboard" className="nav-link">
            <FaHome /> Dashboard
          </Link>
          <Link to="/admin/complaints" className="nav-link">
            <FaExclamationCircle /> Complaints
          </Link>
          <Link to="/admin/permissions" className="nav-link">
            <FaKey /> Permissions
          </Link>
          <Link to="/admin/maintenance" className="nav-link">
            <FaMoneyBill /> Maintenance
          </Link>
          <Link to="/admin/events" className="nav-link">
            <FaCalendar /> Events
          </Link>
          <Link to="/admin/notices" className="nav-link">
            <FaBullhorn /> Notices
          </Link>
          <Link to="/admin/users" className="nav-link">
            <FaUsers /> Users
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
