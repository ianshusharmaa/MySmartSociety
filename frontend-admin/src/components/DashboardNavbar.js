import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Chip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../context/AuthContext';
import './DashboardNavbar.css';

const DashboardNavbar = ({ onOpenNav }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="dashboard-navbar">
      <div className="dashboard-navbar-toolbar">
        <button className="dashboard-navbar-menu-btn" onClick={onOpenNav}>
          <MenuIcon />
        </button>
        <img className="dashboard-navbar-logo" src="/logo.png" alt="MySmartSociety logo" />
        <h1 className="dashboard-navbar-title">My Society Admin</h1>
        <div className="dashboard-navbar-desktop">
          {user?.name && (
            <p className="dashboard-navbar-username">{user.name}</p>
          )}
          {user?.role && (
            <Chip
              size="small"
              color="primary"
              label={user.role.toUpperCase()}
            />
          )}
          <Button
            variant="outlined"
            color="primary"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
        <div className="dashboard-navbar-mobile">
          <button className="dashboard-navbar-logout-icon-btn" onClick={handleLogout}>
            <LogoutIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
