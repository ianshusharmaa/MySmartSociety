import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getComplaintStats, getPermissionStats, getMaintenanceStats } from '../../services/api';
import { FaExclamationCircle, FaKey, FaMoneyBill, FaCheckCircle, FaClock, FaUsers, FaExternalLinkAlt } from 'react-icons/fa';
import '../resident/Dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
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
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p className="flat-info">Society Management Overview</p>
        </div>
        <div className="kpi-grid">
          <div className="kpi-card complaints" onClick={() => navigate('/admin/complaints')}>
            <div className="kpi-top">
              <div className="kpi-icon"><FaExclamationCircle /></div>
              <span className="kpi-pill">Complaints</span>
            </div>
            <div className="kpi-main">{stats.complaints.total}</div>
            <div className="kpi-meta"><FaClock /> {stats.complaints.pending} pending</div>
          </div>

          <div className="kpi-card permissions" onClick={() => navigate('/admin/permissions')}>
            <div className="kpi-top">
              <div className="kpi-icon"><FaKey /></div>
              <span className="kpi-pill">Permissions</span>
            </div>
            <div className="kpi-main">{stats.permissions.total}</div>
            <div className="kpi-meta"><FaClock /> {stats.permissions.pending} pending</div>
          </div>

          <div className="kpi-card maintenance" onClick={() => navigate('/admin/maintenance')}>
            <div className="kpi-top">
              <div className="kpi-icon"><FaMoneyBill /></div>
              <span className="kpi-pill">Maintenance</span>
            </div>
            <div className="kpi-main">₹{stats.maintenance.collectedAmount.toLocaleString()}</div>
            <div className="kpi-meta"><FaCheckCircle /> {stats.maintenance.paid} paid</div>
          </div>

          <div className="kpi-card pending" onClick={() => navigate('/admin/maintenance')}>
            <div className="kpi-top">
              <div className="kpi-icon"><FaUsers /></div>
              <span className="kpi-pill">Pending Payments</span>
            </div>
            <div className="kpi-main">{stats.maintenance.pending}</div>
            <div className="kpi-meta"><FaClock /> Residents to follow up</div>
          </div>
        </div>

        <div className="panel-grid">
          <div className="panel-card">
            <div className="panel-header">
              <div>
                <p className="panel-label">Complaints & Permissions</p>
                <h3 className="panel-title">Operational queue</h3>
              </div>
              <button className="ghost-btn" onClick={() => navigate('/admin/complaints')}>
                View details <FaExternalLinkAlt />
              </button>
            </div>

            <div className="mini-stats">
              <div className="mini-item">
                <span className="mini-label">Complaints pending</span>
                <span className="mini-value">{stats.complaints.pending}</span>
              </div>
              <div className="mini-item">
                <span className="mini-label">Complaints resolved</span>
                <span className="mini-value">{stats.complaints.resolved}</span>
              </div>
              <div className="mini-item">
                <span className="mini-label">Permissions pending</span>
                <span className="mini-value">{stats.permissions.pending}</span>
              </div>
              <div className="mini-item">
                <span className="mini-label">Permissions approved</span>
                <span className="mini-value">{stats.permissions.approved}</span>
              </div>
            </div>
          </div>

          <div className="panel-card">
            <div className="panel-header">
              <div>
                <p className="panel-label">Maintenance & Collections</p>
                <h3 className="panel-title">Cashflow snapshot</h3>
              </div>
              <button className="ghost-btn" onClick={() => navigate('/admin/maintenance')}>
                Go to payments <FaExternalLinkAlt />
              </button>
            </div>

            <div className="mini-stats">
              <div className="mini-item">
                <span className="mini-label">Collected</span>
                <span className="mini-value">₹{stats.maintenance.collectedAmount.toLocaleString()}</span>
              </div>
              <div className="mini-item">
                <span className="mini-label">Paid residents</span>
                <span className="mini-value">{stats.maintenance.paid}</span>
              </div>
              <div className="mini-item">
                <span className="mini-label">Pending residents</span>
                <span className="mini-value">{stats.maintenance.pending}</span>
              </div>
            </div>

            <div className="quick-links">
              <button className="soft-btn" onClick={() => navigate('/admin/notices')}>Send notice</button>
              <button className="soft-btn" onClick={() => navigate('/admin/events')}>Create fundraiser</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AdminDashboard;
