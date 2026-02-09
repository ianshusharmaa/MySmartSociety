import React from 'react';
import { NavLink } from 'react-router-dom';
import { Divider, Drawer } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import adminRoutes from '../routes/adminRoutes';
import './Sidenav.css';

const drawerWidth = 260;

const Sidenav = ({ mobileOpen, onClose }) => {
  const drawerContent = (
    <div className="sidenav-container">
      <div className="sidenav-header">
        <ApartmentIcon className="sidenav-header-icon" />
        <div className="sidenav-header-info">
          <h3>My Society</h3>
          <p>Admin Panel</p>
        </div>
      </div>
      <Divider />
      <div className="sidenav-list">
        {adminRoutes.map((route) => (
          <div key={route.path} className="sidenav-list-item">
            <NavLink
              to={route.path}
              className={({ isActive }) => 
                `sidenav-list-button ${isActive ? 'active' : ''}`
              }
            >
              <span className="sidenav-icon">{route.icon}</span>
              <span className="sidenav-text">{route.label}</span>
            </NavLink>
          </div>
        ))}
      </div>
      <div className="sidenav-footer">
        <span className="sidenav-footer-version">MySmartSociety v1.0</span>
        <span className="sidenav-footer-credit">Developed by Anshu Sharma</span>
      </div>
    </div>
  );

  return (
    <nav className="sidenav-nav">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
          BackdropProps: {
            className: 'sidenav-drawer-backdrop',
          },
        }}
        classes={{ paper: 'sidenav-drawer' }}
      >
        {drawerContent}
      </Drawer>
    </nav>
  );
};

export default Sidenav;
export { drawerWidth };
