import React, { useState, useEffect } from 'react';
import { getNotices } from '../../services/api';
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WarningIcon from '@mui/icons-material/Warning';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const { data } = await getNotices();
      setNotices(data);
    } catch (error) {
      console.error('Failed to fetch notices');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: '#3b82f6',
      medium: '#f59e0b',
      high: '#ef4444',
    };
    return colors[priority] || '#6b7280';
  };

  const getPriorityLabel = (priority) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  const getCategoryIcon = (category) => {
    return category === 'urgent' ? (
      <WarningIcon sx={{ fontSize: 28, color: '#ef4444' }} />
    ) : (
      <NotificationsIcon sx={{ fontSize: 28, color: '#3b82f6' }} />
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        {/* Header */}
        <Typography variant="h4" fontWeight={800} sx={{ color: '#1f2937' }}>
          Society Notices & Announcements
        </Typography>

        {/* Notices List */}
        {notices.length === 0 ? (
          <Card sx={{ bgcolor: '#f0f2f5', border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <NotificationsIcon sx={{ fontSize: 64, color: '#d1d5db', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#6b7280' }}>
                No Notices Found
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {notices.map((notice) => (
              <Grid item xs={12} key={notice._id}>
                <Card
                  sx={{
                    border: `2px solid ${getPriorityColor(notice.priority)}`,
                    '&:hover': { boxShadow: 3 },
                  }}
                >
                  <CardContent>
                    <Stack spacing={2}>
                      {/* Header */}
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                        <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ flex: 1 }}>
                          <Box sx={{ pt: 0.5 }}>{getCategoryIcon(notice.category)}</Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" fontWeight={800} sx={{ color: '#1f2937' }}>
                              {notice.title}
                            </Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <Chip
                            label={getPriorityLabel(notice.priority)}
                            sx={{
                              bgcolor: getPriorityColor(notice.priority),
                              color: 'white',
                              fontWeight: 700,
                              fontSize: 12,
                            }}
                          />
                          <Chip
                            label={notice.category}
                            sx={{
                              bgcolor: '#3b82f6',
                              color: 'white',
                              fontWeight: 700,
                              fontSize: 12,
                            }}
                          />
                        </Stack>
                      </Stack>

                      {/* Content */}
                      <Typography variant="body2" sx={{ color: '#4b5563', lineHeight: 1.6 }}>
                        {notice.content}
                      </Typography>

                      {/* Footer */}
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 'auto', pt: 2 }}>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <CalendarMonthIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                          <Typography variant="caption" sx={{ color: '#6b7280' }}>
                            Posted: {new Date(notice.createdAt).toLocaleDateString('en-GB')}
                          </Typography>
                        </Stack>
                        {notice.expiryDate && (
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <WarningIcon sx={{ fontSize: 16, color: '#f59e0b' }} />
                            <Typography variant="caption" sx={{ color: '#f59e0b', fontWeight: 700 }}>
                              Expires: {new Date(notice.expiryDate).toLocaleDateString('en-GB')}
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </Container>
  );
};

export default Notices;
