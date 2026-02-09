import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import KeyIcon from '@mui/icons-material/VpnKey';
import PaymentsIcon from '@mui/icons-material/Payments';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LaunchIcon from '@mui/icons-material/Launch';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { getComplaintStats, getPermissionStats, getMaintenanceStats, getEvents, getAllUsers } from '../../services/api';
import './Dashboard.css';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    complaints: { total: 0, pending: 0, resolved: 0 },
    permissions: { total: 0, pending: 0, approved: 0 },
    maintenance: { total: 0, paid: 0, pending: 0, collectedAmount: 0 }
  });
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [complaintsRes, permissionsRes, maintenanceRes, eventsRes, usersRes] = await Promise.all([
        getComplaintStats(),
        getPermissionStats(),
        getMaintenanceStats(),
        getEvents(),
        getAllUsers()
      ]);

      setStats({
        complaints: complaintsRes.data,
        permissions: permissionsRes.data,
        maintenance: maintenanceRes.data
      });
      setEvents(eventsRes.data || []);
      setUsers(usersRes.data || []);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Typography variant="body2" color="text.secondary">
          Loading dashboard...
        </Typography>
      </div>
    );
  }

  // Complaints Chart Data
  const complaintsChartData = {
    labels: ['Pending', 'In Progress', 'Resolved'],
    datasets: [{
      data: [
        stats.complaints.pending || 0,
        stats.complaints.inProgress || 0,
        stats.complaints.resolved || 0
      ],
      backgroundColor: ['#f59e0b', '#3b82f6', '#10b981'],
      borderWidth: 0,
    }]
  };

  // Permissions Chart Data
  const permissionsChartData = {
    labels: ['Pending', 'Approved', 'Rejected'],
    datasets: [{
      data: [
        stats.permissions.pending || 0,
        stats.permissions.approved || 0,
        stats.permissions.rejected || 0
      ],
      backgroundColor: ['#f59e0b', '#10b981', '#ef4444'],
      borderWidth: 0,
    }]
  };

  // Users Chart Data
  const activeUsers = users.filter(u => u.isActive).length;
  const inactiveUsers = users.length - activeUsers;
  const usersChartData = {
    labels: ['Active', 'Inactive'],
    datasets: [{
      data: [activeUsers, inactiveUsers],
      backgroundColor: ['#10b981', '#ef4444'],
      borderWidth: 0,
    }]
  };

  // Events Fundraiser Data
  const eventsBarData = {
    labels: events.slice(0, 5).map(e => e.title?.substring(0, 20) || 'Event'),
    datasets: [{
      label: 'Collected',
      data: events.slice(0, 5).map(e => e.collectedAmount || 0),
      backgroundColor: '#10b981',
    }, {
      label: 'Target',
      data: events.slice(0, 5).map(e => e.targetAmount || 0),
      backgroundColor: '#e5e7eb',
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 15, font: { size: 11 } }
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 10, font: { size: 11 } }
      }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  const statCards = [
    {
      title: 'Complaints',
      value: stats.complaints.total,
      helper: `${stats.complaints.pending} pending`,
      icon: <ReportProblemIcon />,
      colorClass: 'error',
      onClick: () => navigate('/admin/complaints'),
    },
    {
      title: 'Permissions',
      value: stats.permissions.total,
      helper: `${stats.permissions.pending} pending`,
      icon: <KeyIcon />,
      colorClass: 'warning',
      onClick: () => navigate('/admin/permissions'),
    },
    {
      title: 'Maintenance',
      value: `₹${stats.maintenance.collectedAmount.toLocaleString()}`,
      helper: `${stats.maintenance.paid} paid`,
      icon: <PaymentsIcon />,
      colorClass: 'success',
      onClick: () => navigate('/admin/maintenance'),
    },
    {
      title: 'Pending Payments',
      value: stats.maintenance.pending,
      helper: 'Residents to follow up',
      icon: <PeopleAltIcon />,
      colorClass: 'info',
      onClick: () => navigate('/admin/maintenance'),
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-subtitle">Society management overview</p>
      </div>

      <Grid container spacing={2} className="stats-grid">
        {statCards.map((card) => (
          <Grid item xs={12} sm={6} lg={3} key={card.title}>
            <div className="stat-card" onClick={card.onClick}>
              <div className="stat-card-content">
                <div className="stat-icon-row">
                  <div className={`stat-icon ${card.colorClass}`}>
                    {card.icon}
                  </div>
                  <div className="stat-details">
                    <p className="stat-label">{card.title}</p>
                    <h3 className="stat-value">{card.value}</h3>
                  </div>
                </div>
                <div className="stat-helper-row">
                  <ScheduleIcon className="stat-helper-icon" />
                  <span className="stat-helper-text">{card.helper}</span>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} className="main-grid">
        <Grid item xs={12} lg={6}>
          <div className="section-card">
            <div className="section-card-content">
              <div className="section-header">
                <div className="section-info">
                  <p className="section-overline">Complaints & Permissions</p>
                  <h3 className="section-title">Operational queue</h3>
                </div>
                <Button
                  size="small"
                  endIcon={<LaunchIcon />}
                  onClick={() => navigate('/admin/complaints')}
                >
                  View details
                </Button>
              </div>

              <div className="section-list">
                <div className="section-list-item">
                  <span className="section-list-label">Complaints pending</span>
                  <Chip size="small" label={stats.complaints.pending} color="warning" />
                </div>
                <div className="section-list-item">
                  <span className="section-list-label">Complaints resolved</span>
                  <Chip size="small" label={stats.complaints.resolved} color="success" />
                </div>
                <div className="section-list-item">
                  <span className="section-list-label">Permissions pending</span>
                  <Chip size="small" label={stats.permissions.pending} color="warning" />
                </div>
                <div className="section-list-item">
                  <span className="section-list-label">Permissions approved</span>
                  <Chip size="small" label={stats.permissions.approved} color="success" />
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} lg={6}>
          <div className="section-card">
            <div className="section-card-content">
              <div className="section-header">
                <div className="section-info">
                  <p className="section-overline">Maintenance & Collections</p>
                  <h3 className="section-title">Cashflow snapshot</h3>
                </div>
                <Button
                  size="small"
                  endIcon={<LaunchIcon />}
                  onClick={() => navigate('/admin/maintenance')}
                >
                  Go to payments
                </Button>
              </div>

              <div className="section-list">
                <div className="section-list-item">
                  <span className="section-list-label">Collected</span>
                  <span className="section-list-value">
                    ₹{stats.maintenance.collectedAmount.toLocaleString()}
                  </span>
                </div>
                <div className="section-list-item">
                  <span className="section-list-label">Paid residents</span>
                  <div className="section-list-icon-value">
                    <CheckCircleIcon className="section-list-icon success" />
                    <span className="section-list-value">{stats.maintenance.paid}</span>
                  </div>
                </div>
                <div className="section-list-item">
                  <span className="section-list-label">Pending residents</span>
                  <div className="section-list-icon-value">
                    <ScheduleIcon className="section-list-icon warning" />
                    <span className="section-list-value">{stats.maintenance.pending}</span>
                  </div>
                </div>
              </div>

              <div className="action-buttons">
                <Button variant="contained" onClick={() => navigate('/admin/notices')}>
                  Send notice
                </Button>
                <Button variant="outlined" onClick={() => navigate('/admin/events')}>
                  Create fundraiser
                </Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={2} className="chart-grid">
        <Grid item xs={12} lg={6}>
          <div className="chart-card">
            <div className="chart-card-content">
              <h3 className="chart-title">Complaints Status</h3>
              <div className="chart-container">
                <Doughnut data={complaintsChartData} options={chartOptions} />
              </div>
              <div className="chart-stats">
                <div className="chart-stat-row">
                  <span className="chart-stat-label">Total Complaints:</span>
                  <Chip size="small" label={stats.complaints.total} color="primary" />
                </div>
                <div className="chart-stat-row">
                  <span className="chart-stat-label">Pending:</span>
                  <Chip size="small" label={stats.complaints.pending} className="chip-warning" />
                </div>
                <div className="chart-stat-row">
                  <span className="chart-stat-label">Resolved:</span>
                  <Chip size="small" label={stats.complaints.resolved} className="chip-success" />
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} lg={6}>
          <div className="chart-card">
            <div className="chart-card-content">
              <h3 className="chart-title">Permissions Overview</h3>
              <div className="chart-container">
                <Doughnut data={permissionsChartData} options={chartOptions} />
              </div>
              <div className="chart-stats">
                <div className="chart-stat-row">
                  <span className="chart-stat-label">Total Permissions:</span>
                  <Chip size="small" label={stats.permissions.total} color="primary" />
                </div>
                <div className="chart-stat-row">
                  <span className="chart-stat-label">Pending:</span>
                  <Chip size="small" label={stats.permissions.pending} className="chip-warning" />
                </div>
                <div className="chart-stat-row">
                  <span className="chart-stat-label">Approved:</span>
                  <Chip size="small" label={stats.permissions.approved} className="chip-success" />
                </div>
                <div className="chart-stat-row">
                  <span className="chart-stat-label">Rejected:</span>
                  <Chip size="small" label={stats.permissions.rejected || 0} className="chip-error" />
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} lg={6}>
          <div className="chart-card">
            <div className="chart-card-content">
              <h3 className="chart-title">User Activity</h3>
              <div className="chart-container">
                <Doughnut data={usersChartData} options={chartOptions} />
              </div>
              <div className="chart-stats">
                <div className="chart-stat-row">
                  <span className="chart-stat-label">Total Users:</span>
                  <Chip size="small" label={users.length} color="primary" />
                </div>
                <div className="chart-stat-row">
                  <span className="chart-stat-label">Active Users:</span>
                  <Chip size="small" label={activeUsers} className="chip-success" />
                </div>
                <div className="chart-stat-row">
                  <span className="chart-stat-label">Inactive Users:</span>
                  <Chip size="small" label={inactiveUsers} className="chip-error" />
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} lg={6}>
          <div className="chart-card">
            <div className="chart-card-content">
              <h3 className="chart-title">Events Fundraiser Progress</h3>
              <div className="chart-container">
                <Bar data={eventsBarData} options={barChartOptions} />
              </div>
              <div className="chart-stats">
                <div className="chart-stat-row">
                  <span className="chart-stat-label">Total Events:</span>
                  <Chip size="small" label={events.length} color="primary" />
                </div>
                <div className="chart-stat-row">
                  <span className="chart-stat-label">Total Collected:</span>
                  <span className="chart-stat-value">₹{events.reduce((sum, e) => sum + (e.collectedAmount || 0), 0).toLocaleString()}</span>
                </div>
                <div className="chart-stat-row">
                  <span className="chart-stat-label">Total Target:</span>
                  <span className="chart-stat-value">₹{events.reduce((sum, e) => sum + (e.targetAmount || 0), 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
