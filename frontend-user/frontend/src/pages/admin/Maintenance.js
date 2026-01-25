import React from 'react';
import Navbar from '../../components/Navbar';

const AdminMaintenance = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Maintenance Management</h1>
        <p>Create maintenance records, view payment status, and download reports.</p>
      </div>
    </>
  );
};

export default AdminMaintenance;
