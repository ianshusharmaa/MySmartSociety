import React from 'react';
import AdminNavbar from '../components/AdminNavbar';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <main className="page-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
