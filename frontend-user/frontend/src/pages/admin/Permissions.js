import React from 'react';
import Navbar from '../../components/Navbar';

const AdminPermissions = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Admin Permissions Management</h1>
        <p>Similar to Admin Complaints - Review, approve, or reject permission requests from residents.</p>
      </div>
    </>
  );
};

export default AdminPermissions;
