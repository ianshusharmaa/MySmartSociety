import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaHome, FaExclamationCircle, FaKey, FaMoneyBill, FaCalendar, FaBullhorn, FaUser, FaSignOutAlt, FaUsers, FaCog } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <nav className={`navbar ${isAdmin ? 'navbar-admin' : 'navbar-resident'}`}>
      <div className="navbar-shell">
        <div className="navbar-top">
          <Link to={isAdmin ? '/admin/dashboard' : '/dashboard'} className="navbar-brand">
            <span className="brand-icon">🏢</span>
            <div>
              <div className="brand-title">My Society</div>
              <div className="brand-subtitle">{isAdmin ? 'Admin Panel' : 'Resident Portal'}</div>
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
          {isAdmin ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
