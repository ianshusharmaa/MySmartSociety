import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getComplaints, getPermissions, getMaintenanceRecords, getNotices } from '../../services/api';
import { FaExclamationCircle, FaKey, FaMoneyBill, FaBullhorn } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    complaints: 0,
    permissions: 0,
    pendingPayments: 0,
    notices: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [complaintsRes, permissionsRes, maintenanceRes, noticesRes] = await Promise.all([
        getComplaints(),
        getPermissions(),
        getMaintenanceRecords(),
        getNotices()
      ]);

      setStats({
        complaints: complaintsRes.data.length,
        permissions: permissionsRes.data.length,
        pendingPayments: maintenanceRes.data.filter(m => m.status === 'pending').length,
        notices: noticesRes.data.length
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading"><div className="spinner"></div></div>
    );
  }

  return (
    <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome, {user?.name}!</h1>
          <p className="flat-info">
            {user?.building} - Flat {user?.flatNumber}
          </p>
        </div>

        <div className="stats-grid">
          <Link to="/complaints" className="stat-card stat-complaints">
            <div className="stat-icon">
              <FaExclamationCircle />
            </div>
            <div className="stat-content">
              <h3>My Complaints</h3>
              <p className="stat-number">{stats.complaints}</p>
            </div>
          </Link>

          <Link to="/permissions" className="stat-card stat-permissions">
            <div className="stat-icon">
              <FaKey />
            </div>
            <div className="stat-content">
              <h3>Permission Requests</h3>
              <p className="stat-number">{stats.permissions}</p>
            </div>
          </Link>

          <Link to="/maintenance" className="stat-card stat-maintenance">
            <div className="stat-icon">
              <FaMoneyBill />
            </div>
            <div className="stat-content">
              <h3>Pending Payments</h3>
              <p className="stat-number">{stats.pendingPayments}</p>
            </div>
          </Link>

          <Link to="/notices" className="stat-card stat-notices">
            <div className="stat-icon">
              <FaBullhorn />
            </div>
            <div className="stat-content">
              <h3>Active Notices</h3>
              <p className="stat-number">{stats.notices}</p>
            </div>
          </Link>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/complaints" className="btn btn-primary">
              <FaExclamationCircle /> Raise Complaint
            </Link>
            <Link to="/permissions" className="btn btn-secondary">
              <FaKey /> Request Permission
            </Link>
            <Link to="/maintenance" className="btn btn-primary">
              <FaMoneyBill /> Pay Maintenance
            </Link>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
