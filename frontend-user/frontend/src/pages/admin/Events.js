import React from 'react';
import Navbar from '../../components/Navbar';

const AdminEvents = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Events Management</h1>
        <p>Create society events, set fundraising targets, and track contributions.</p>
      </div>
    </>
  );
};

export default AdminEvents;
