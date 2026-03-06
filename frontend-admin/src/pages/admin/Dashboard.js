import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getComplaintStats, getPermissionStats, getMaintenanceStats, getNotices, getEvents } from '../../services/api';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SecurityIcon from '@mui/icons-material/Security';
import BuildIcon from '@mui/icons-material/Build';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CampaignIcon from '@mui/icons-material/Campaign';
import EventIcon from '@mui/icons-material/Event';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    complaints: { total: 0, pending: 0, resolved: 0 },
    permissions: { total: 0, pending: 0, approved: 0 },
    maintenance: { total: 0, paid: 0, pending: 0, collectedAmount: 0 },
  });
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getEventStartDate = (event) => {
    if (!event) return null;
    const rawDate = event.startDate || event.date;
    if (!rawDate) return null;

    const parsedDate = new Date(rawDate);
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  const fetchDashboardData = async () => {
    try {
      const [complaintsRes, permissionsRes, maintenanceRes, noticesRes, eventsRes] = await Promise.all([
        getComplaintStats(),
        getPermissionStats(),
        getMaintenanceStats(),
        getNotices(),
        getEvents(),
      ]);

      setStats({
        complaints: complaintsRes.data,
        permissions: permissionsRes.data,
        maintenance: maintenanceRes.data,
      });

      // Get 3 most recent notices
      const sortedNotices = noticesRes.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
      setNotices(sortedNotices);

      // Get upcoming events (future start date)
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcoming = eventsRes.data
        .filter((event) => {
          const eventStartDate = getEventStartDate(event);
          return eventStartDate && eventStartDate >= today;
        })
        .sort((a, b) => getEventStartDate(a) - getEventStartDate(b))
        .slice(0, 3);
      setEvents(upcoming);
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
      label: 'Total Complaints',
      value: stats.complaints.total,
      path: '/admin/complaints',
      bgColor: 'rgba(239, 68, 68, 0.1)',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#f59e0b' }} />,
      label: 'Total Permissions',
      value: stats.permissions.total,
      path: '/admin/permissions',
      bgColor: 'rgba(245, 158, 11, 0.1)',
    },
    {
      icon: <BuildIcon sx={{ fontSize: 40, color: '#3b82f6' }} />,
      label: 'Pending Payments',
      value: stats.maintenance.pending,
      path: '/admin/maintenance',
      bgColor: 'rgba(59, 130, 246, 0.1)',
    },
    {
      icon: <NotificationsIcon sx={{ fontSize: 40, color: '#8b5cf6' }} />,
      label: 'Collections',
      value: `₹${stats.maintenance.collectedAmount.toLocaleString()}`,
      path: '/admin/maintenance',
      bgColor: 'rgba(139, 92, 246, 0.1)',
    },
  ];

  // Prepare chart data
  const complaintStatusData = [
    { name: 'Pending', value: stats.complaints.pending || 0 },
    { name: 'Resolved', value: stats.complaints.resolved || 0 },
  ].filter(item => item.value > 0);

  const permissionStatusData = [
    { name: 'Pending', value: stats.permissions.pending || 0 },
    { name: 'Approved', value: stats.permissions.approved || 0 },
  ].filter(item => item.value > 0);

  const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444'];

  return (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        {/* Header */}
        <Box>
          <Typography variant="h4" fontWeight={800} sx={{ color: '#1f2937', mb: 1 }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            Society management overview
          </Typography>
        </Box>

        {/* Stat Cards */}
        <Grid container spacing={3}>
          {statCards.map((card, index) => (
            <Grid item xs={12} key={index}>
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
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box>{card.icon}</Box>
                    <Stack>
                      <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 600 }}>
                        {card.label}
                      </Typography>
                      <Typography variant="h4" fontWeight={800} sx={{ color: '#1f2937' }}>
                        {card.value}
                      </Typography>
                    </Stack>
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
                  onClick={() => navigate('/admin/complaints')}
                  startIcon={<AssignmentIcon />}
                  sx={{
                    bgcolor: '#ef4444',
                    color: 'white',
                    fontWeight: 700,
                    py: 1.5,
                    '&:hover': { bgcolor: '#dc2626' },
                  }}
                >
                  Manage Complaints
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate('/admin/permissions')}
                  startIcon={<SecurityIcon />}
                  sx={{
                    bgcolor: '#f59e0b',
                    color: 'white',
                    fontWeight: 700,
                    py: 1.5,
                    '&:hover': { bgcolor: '#d97706' },
                  }}
                >
                  Manage Permissions
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate('/admin/maintenance')}
                  startIcon={<BuildIcon />}
                  sx={{
                    bgcolor: '#3b82f6',
                    color: 'white',
                    fontWeight: 700,
                    py: 1.5,
                    '&:hover': { bgcolor: '#2563eb' },
                  }}
                >
                  Manage Maintenance
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Charts Section */}
        {complaintStatusData.length > 0 || permissionStatusData.length > 0 ? (
          <Grid container spacing={3}>
            {complaintStatusData.length > 0 && (
              <Grid item xs={12}>
                <Card sx={{ border: '1px solid #e5e7eb', height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={800} sx={{ color: '#1f2937', mb: 3 }}>
                      Complaint Status Overview
                    </Typography>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={complaintStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {complaintStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            )}
            {permissionStatusData.length > 0 && (
              <Grid item xs={12}>
                <Card sx={{ border: '1px solid #e5e7eb', height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={800} sx={{ color: '#1f2937', mb: 3 }}>
                      Permission Status Overview
                    </Typography>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={permissionStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {permissionStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        ) : null}

        {/* Recent Notices Section */}
        <Card sx={{ border: '1px solid #e5e7eb' }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <CampaignIcon sx={{ color: '#8b5cf6', fontSize: 28 }} />
                <Typography variant="h6" fontWeight={800} sx={{ color: '#1f2937' }}>
                  Recent Notices
                </Typography>
              </Stack>
              <Button
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/admin/notices')}
                sx={{ fontWeight: 600, textTransform: 'none' }}
              >
                View All
              </Button>
            </Stack>

            {notices.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  No notices available
                </Typography>
              </Box>
            ) : (
              <Stack spacing={2}>
                {notices.map((notice, index) => (
                  <Box key={notice._id || index}>
                    <Stack spacing={1}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#1f2937' }}>
                          {notice.title}
                        </Typography>
                        <Chip
                          label={notice.priority || 'medium'}
                          size="small"
                          color={notice.priority === 'high' ? 'error' : notice.priority === 'low' ? 'success' : 'warning'}
                          sx={{ fontWeight: 600 }}
                        />
                      </Stack>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {notice.content?.substring(0, 150)}
                        {notice.content?.length > 150 ? '...' : ''}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(notice.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Typography>
                    </Stack>
                    {index < notices.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events Section */}
        <Card sx={{ border: '1px solid #e5e7eb', bgcolor: '#fefce8' }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <EventIcon sx={{ color: '#f59e0b', fontSize: 28 }} />
                <Typography variant="h6" fontWeight={800} sx={{ color: '#1f2937' }}>
                  Upcoming Events
                </Typography>
              </Stack>
              <Button
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/admin/events')}
                sx={{ fontWeight: 600, textTransform: 'none' }}
              >
                View All
              </Button>
            </Stack>

            {events.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  No upcoming events
                </Typography>
              </Box>
            ) : (
              <Stack spacing={2}>
                {events.map((event, index) => (
                  <Box key={event._id || index}>
                    <Stack spacing={1}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#1f2937' }}>
                          {event.title}
                        </Typography>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <CalendarTodayIcon sx={{ fontSize: 14, color: '#f59e0b' }} />
                          <Typography variant="caption" sx={{ color: '#f59e0b', fontWeight: 600 }}>
                            {getEventStartDate(event)?.toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                            }) || 'TBD'}
                          </Typography>
                        </Stack>
                      </Stack>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {event.description?.substring(0, 120)}
                        {event.description?.length > 120 ? '...' : ''}
                      </Typography>
                      <Stack direction="row" spacing={2}>
                        {event.time && (
                          <Chip
                            label={event.time}
                            size="small"
                            sx={{ bgcolor: 'white', fontWeight: 600 }}
                          />
                        )}
                        {event.location && (
                          <Chip
                            label={event.location}
                            size="small"
                            sx={{ bgcolor: 'white', fontWeight: 600 }}
                          />
                        )}
                      </Stack>
                    </Stack>
                    {index < events.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default AdminDashboard;
