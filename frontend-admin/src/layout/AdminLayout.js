import React, { useState } from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <div className="admin-layout-container">
      <div className="admin-layout-content-wrapper">
        <DashboardNavbar onOpenNav={handleDrawerToggle} />
        <Sidenav mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
        <main className={`admin-layout-main ${mobileOpen ? 'mobile-blur' : ''}`}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
