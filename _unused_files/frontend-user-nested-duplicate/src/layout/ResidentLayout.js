import React from 'react';
import ResidentNavbar from '../components/ResidentNavbar';

const ResidentLayout = ({ children }) => {
  return (
    <div className="resident-layout">
      <ResidentNavbar />
      <main className="page-content">
        {children}
      </main>
    </div>
  );
};

export default ResidentLayout;
