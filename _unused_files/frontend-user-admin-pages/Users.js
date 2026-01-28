import React from 'react';
import Navbar from '../../components/Navbar';

const AdminUsers = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>User Management</h1>
        <p>View all residents, activate/deactivate accounts, and manage user roles.</p>
      </div>
    </>
  );
};

export default AdminUsers;
