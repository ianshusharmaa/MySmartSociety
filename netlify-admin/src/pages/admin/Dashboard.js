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
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <Typography variant="body2" color="text.secondary">
          Loading dashboard...
        </Typography>
      </Box>
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
      color: 'error.main',
      onClick: () => navigate('/admin/complaints'),
    },
    {
      title: 'Permissions',
      value: stats.permissions.total,
      helper: `${stats.permissions.pending} pending`,
      icon: <KeyIcon />,
      color: 'warning.main',
      onClick: () => navigate('/admin/permissions'),
    },
    {
      title: 'Maintenance',
      value: `₹${stats.maintenance.collectedAmount.toLocaleString()}`,
      helper: `${stats.maintenance.paid} paid`,
      icon: <PaymentsIcon />,
      color: 'success.main',
      onClick: () => navigate('/admin/maintenance'),
    },
    {
      title: 'Pending Payments',
      value: stats.maintenance.pending,
      helper: 'Residents to follow up',
      icon: <PeopleAltIcon />,
      color: 'info.main',
      onClick: () => navigate('/admin/maintenance'),
    },
  ];

  return (
    <Box>
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Admin Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Society management overview
        </Typography>
      </Stack>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        {statCards.map((card) => (
          <Grid item xs={12} sm={6} lg={3} key={card.title}>
            <Card
              onClick={card.onClick}
              sx={{
                cursor: 'pointer',
                height: '100%',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
              }}
            >
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: card.color,
                      color: '#fff',
                      fontSize: 22,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      {card.title}
                    </Typography>
                    <Typography variant="h6" fontWeight={700}>
                      {card.value}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
                  <ScheduleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {card.helper}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Complaints & Permissions
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    Operational queue
                  </Typography>
                </Box>
                <Button
                  size="small"
                  endIcon={<LaunchIcon />}
                  onClick={() => navigate('/admin/complaints')}
                >
                  View details
                </Button>
              </Stack>

              <Stack spacing={2} sx={{ mt: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Complaints pending
                  </Typography>
                  <Chip size="small" label={stats.complaints.pending} color="warning" />
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Complaints resolved
                  </Typography>
                  <Chip size="small" label={stats.complaints.resolved} color="success" />
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Permissions pending
                  </Typography>
                  <Chip size="small" label={stats.permissions.pending} color="warning" />
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Permissions approved
                  </Typography>
                  <Chip size="small" label={stats.permissions.approved} color="success" />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Maintenance & Collections
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    Cashflow snapshot
                  </Typography>
                </Box>
                <Button
                  size="small"
                  endIcon={<LaunchIcon />}
                  onClick={() => navigate('/admin/maintenance')}
                >
                  Go to payments
                </Button>
              </Stack>

              <Stack spacing={2} sx={{ mt: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Collected
                  </Typography>
                  <Typography variant="body2" fontWeight={700}>
                    ₹{stats.maintenance.collectedAmount.toLocaleString()}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Paid residents
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
                    <Typography variant="body2" fontWeight={700}>
                      {stats.maintenance.paid}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Pending residents
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <ScheduleIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                    <Typography variant="body2" fontWeight={700}>
                      {stats.maintenance.pending}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button variant="contained" onClick={() => navigate('/admin/notices')}>
                  Send notice
                </Button>
                <Button variant="outlined" onClick={() => navigate('/admin/events')}>
                  Create fundraiser
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} lg={6}>
          <Card sx={{ height: '100%', minHeight: 420 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Complaints Status
              </Typography>
              <Box sx={{ height: 220, display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                <Doughnut data={complaintsChartData} options={chartOptions} />
              </Box>
              <Stack spacing={1} sx={{ pt: 1, borderTop: '1px solid #e5e7eb' }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Total Complaints:</Typography>
                  <Chip size="small" label={stats.complaints.total} color="primary" />
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Pending:</Typography>
                  <Chip size="small" label={stats.complaints.pending} sx={{ bgcolor: '#f59e0b', color: 'white' }} />
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Resolved:</Typography>
                  <Chip size="small" label={stats.complaints.resolved} sx={{ bgcolor: '#10b981', color: 'white' }} />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card sx={{ height: '100%', minHeight: 420 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Permissions Overview
              </Typography>
              <Box sx={{ height: 220, display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                <Doughnut data={permissionsChartData} options={chartOptions} />
              </Box>
              <Stack spacing={1} sx={{ pt: 1, borderTop: '1px solid #e5e7eb' }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Total Permissions:</Typography>
                  <Chip size="small" label={stats.permissions.total} color="primary" />
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Pending:</Typography>
                  <Chip size="small" label={stats.permissions.pending} sx={{ bgcolor: '#f59e0b', color: 'white' }} />
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Approved:</Typography>
                  <Chip size="small" label={stats.permissions.approved} sx={{ bgcolor: '#10b981', color: 'white' }} />
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Rejected:</Typography>
                  <Chip size="small" label={stats.permissions.rejected || 0} sx={{ bgcolor: '#ef4444', color: 'white' }} />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card sx={{ height: '100%', minHeight: 420 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                User Activity
              </Typography>
              <Box sx={{ height: 220, display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                <Doughnut data={usersChartData} options={chartOptions} />
              </Box>
              <Stack spacing={1} sx={{ pt: 1, borderTop: '1px solid #e5e7eb' }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Total Users:</Typography>
                  <Chip size="small" label={users.length} color="primary" />
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Active Users:</Typography>
                  <Chip size="small" label={activeUsers} sx={{ bgcolor: '#10b981', color: 'white' }} />
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Inactive Users:</Typography>
                  <Chip size="small" label={inactiveUsers} sx={{ bgcolor: '#ef4444', color: 'white' }} />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card sx={{ height: '100%', minHeight: 420 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Events Fundraiser Progress
              </Typography>
              <Box sx={{ height: 220, mb: 2 }}>
                <Bar data={eventsBarData} options={barChartOptions} />
              </Box>
              <Stack spacing={1} sx={{ pt: 1, borderTop: '1px solid #e5e7eb' }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Total Events:</Typography>
                  <Chip size="small" label={events.length} color="primary" />
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Total Collected:</Typography>
                  <Typography variant="caption" fontWeight={700}>₹{events.reduce((sum, e) => sum + (e.collectedAmount || 0), 0).toLocaleString()}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Total Target:</Typography>
                  <Typography variant="caption" fontWeight={700}>₹{events.reduce((sum, e) => sum + (e.targetAmount || 0), 0).toLocaleString()}</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
