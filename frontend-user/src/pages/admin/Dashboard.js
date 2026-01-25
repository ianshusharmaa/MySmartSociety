import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { getComplaintStats, getPermissionStats, getMaintenanceStats } from '../../services/api';
import { FaExclamationCircle, FaKey, FaMoneyBill, FaCheckCircle, FaClock, FaUsers } from 'react-icons/fa';
import '../resident/Dashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    complaints: { total: 0, pending: 0, resolved: 0 },
    permissions: { total: 0, pending: 0, approved: 0 },
    maintenance: { total: 0, paid: 0, pending: 0, collectedAmount: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [complaintsRes, permissionsRes, maintenanceRes] = await Promise.all([
        getComplaintStats(),
        getPermissionStats(),
        getMaintenanceStats()
      ]);

      setStats({
        complaints: complaintsRes.data,
        permissions: permissionsRes.data,
        maintenance: maintenanceRes.data
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading"><div className="spinner"></div></div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p className="flat-info">Society Management Overview</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card stat-complaints">
            <div className="stat-icon">
              <FaExclamationCircle />
            </div>
            <div className="stat-content">
              <h3>Total Complaints</h3>
              <p className="stat-number">{stats.complaints.total}</p>
              <p className="stat-detail">
                <FaClock /> {stats.complaints.pending} pending
              </p>
            </div>
          </div>

          <div className="stat-card stat-permissions">
            <div className="stat-icon">
              <FaKey />
            </div>
            <div className="stat-content">
              <h3>Permission Requests</h3>
              <p className="stat-number">{stats.permissions.total}</p>
              <p className="stat-detail">
                <FaClock /> {stats.permissions.pending} pending
              </p>
            </div>
          </div>

          <div className="stat-card stat-maintenance">
            <div className="stat-icon">
              <FaMoneyBill />
            </div>
            <div className="stat-content">
              <h3>Maintenance Collected</h3>
              <p className="stat-number">₹{stats.maintenance.collectedAmount.toLocaleString()}</p>
              <p className="stat-detail">
                <FaCheckCircle /> {stats.maintenance.paid} paid
              </p>
            </div>
          </div>

          <div className="stat-card stat-notices">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-content">
              <h3>Pending Payments</h3>
              <p className="stat-number">{stats.maintenance.pending}</p>
              <p className="stat-detail">
                <FaClock /> Residents to follow up
              </p>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <a href="/admin/complaints" className="btn btn-primary">
              <FaExclamationCircle /> Manage Complaints
            </a>
            <a href="/admin/permissions" className="btn btn-secondary">
              <FaKey /> Review Permissions
            </a>
            <a href="/admin/maintenance" className="btn btn-primary">
              <FaMoneyBill /> Maintenance Records
            </a>
            <a href="/admin/notices" className="btn btn-secondary">
              Create Notice
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
