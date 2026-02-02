import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getComplaints, getPermissions, getMaintenanceRecords, getNotices } from '../../services/api';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SecurityIcon from '@mui/icons-material/Security';
import BuildIcon from '@mui/icons-material/Build';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    complaints: 0,
    permissions: 0,
    pendingPayments: 0,
    notices: 0,
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
        getNotices(),
      ]);

      setStats({
        complaints: complaintsRes.data.length,
        permissions: permissionsRes.data.length,
        pendingPayments: maintenanceRes.data.filter((m) => m.status === 'pending').length,
        notices: noticesRes.data.length,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  const statCards = [
    {
      icon: <AssignmentIcon sx={{ fontSize: 40, color: '#ef4444' }} />,
      label: 'My Complaints',
      value: stats.complaints,
      path: '/complaints',
      bgColor: 'rgba(239, 68, 68, 0.1)',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#f59e0b' }} />,
      label: 'Permission Requests',
      value: stats.permissions,
      path: '/permissions',
      bgColor: 'rgba(245, 158, 11, 0.1)',
    },
    {
      icon: <BuildIcon sx={{ fontSize: 40, color: '#3b82f6' }} />,
      label: 'Pending Payments',
      value: stats.pendingPayments,
      path: '/maintenance',
      bgColor: 'rgba(59, 130, 246, 0.1)',
    },
    {
      icon: <NotificationsIcon sx={{ fontSize: 40, color: '#8b5cf6' }} />,
      label: 'Active Notices',
      value: stats.notices,
      path: '/notices',
      bgColor: 'rgba(139, 92, 246, 0.1)',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        {/* Header */}
        <Box>
          <Typography variant="h4" fontWeight={800} sx={{ color: '#1f2937', mb: 1 }}>
            Welcome, {user?.name}!
          </Typography>
          <Chip
            label={`${user?.building} - Flat ${user?.flatNumber}`}
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        </Box>

        {/* Stat Cards */}
        <Grid container spacing={3}>
          {statCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                onClick={() => navigate(card.path)}
                sx={{
                  cursor: 'pointer',
                  bgcolor: card.bgColor,
                  border: '1px solid #e5e7eb',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Box>{card.icon}</Box>
                    <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600 }}>
                      {card.label}
                    </Typography>
                    <Typography variant="h4" fontWeight={800} sx={{ color: '#1f2937' }}>
                      {card.value}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Quick Actions */}
        <Card sx={{ bgcolor: '#f0f2f5', border: '1px solid #e5e7eb' }}>
          <CardContent>
            <Typography variant="h6" fontWeight={800} sx={{ color: '#1f2937', mb: 3 }}>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate('/complaints')}
                  startIcon={<AssignmentIcon />}
                  sx={{
                    bgcolor: '#ef4444',
                    color: 'white',
                    fontWeight: 700,
                    py: 1.5,
                    '&:hover': { bgcolor: '#dc2626' },
                  }}
                >
                  Raise Complaint
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate('/permissions')}
                  startIcon={<SecurityIcon />}
                  sx={{
                    bgcolor: '#f59e0b',
                    color: 'white',
                    fontWeight: 700,
                    py: 1.5,
                    '&:hover': { bgcolor: '#d97706' },
                  }}
                >
                  Request Permission
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate('/maintenance')}
                  startIcon={<BuildIcon />}
                  sx={{
                    bgcolor: '#3b82f6',
                    color: 'white',
                    fontWeight: 700,
                    py: 1.5,
                    '&:hover': { bgcolor: '#2563eb' },
                  }}
                >
                  Pay Maintenance
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default Dashboard;
