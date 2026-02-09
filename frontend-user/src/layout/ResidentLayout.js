import React, { useState } from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import ResidentSidenav from '../components/ResidentSidenav';
import Footer from '../components/Footer';
import './ResidentLayout.css';

const ResidentLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <div className="resident-layout-container">
      <div className="resident-layout-content-wrapper">
        <DashboardNavbar onOpenNav={handleDrawerToggle} />
        <ResidentSidenav mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
        <main className="resident-layout-main">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ResidentLayout;
