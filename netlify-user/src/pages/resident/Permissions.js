import React, { useState, useEffect } from 'react';
import { showToast } from '../../utils/notifications';
import { getPermissions, createPermission } from '../../services/api';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SecurityIcon from '@mui/icons-material/Security';

const Permissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: 'event',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const { data } = await getPermissions();
      setPermissions(data);
    } catch (error) {
      showToast('Failed to fetch permissions', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPermission(formData);
      showToast('Permission request submitted successfully', 'success');
      setShowModal(false);
      setFormData({ type: 'event', title: '', description: '', startDate: '', endDate: '' });
      fetchPermissions();
    } catch (error) {
      showToast('Failed to create permission request', 'error');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      approved: '#10b981',
      rejected: '#ef4444',
    };
    return colors[status] || '#6b7280';
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
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
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight={800} sx={{ color: '#1f2937' }}>
            Permission Requests
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setShowModal(true)}
            sx={{
              bgcolor: '#f59e0b',
              color: 'white',
              fontWeight: 700,
              '&:hover': { bgcolor: '#d97706' },
            }}
          >
            Request Permission
          </Button>
        </Stack>

        {/* Permissions List */}
        {permissions.length === 0 ? (
          <Card sx={{ bgcolor: '#f0f2f5', border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <SecurityIcon sx={{ fontSize: 64, color: '#d1d5db', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#6b7280', mb: 2 }}>
                No Permission Requests Found
              </Typography>
              <Button
                variant="contained"
                onClick={() => setShowModal(true)}
                sx={{
                  bgcolor: '#f59e0b',
                  color: 'white',
                  '&:hover': { bgcolor: '#d97706' },
                }}
              >
                Create Your First Request
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {permissions.map((permission) => (
              <Grid item xs={12} md={6} key={permission._id}>
                <Card
                  sx={{
                    height: '100%',
                    border: '1px solid #e5e7eb',
                    '&:hover': { boxShadow: 3 },
                  }}
                >
                  <CardContent>
                    <Stack spacing={2}>
                      {/* Header */}
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Typography variant="h6" fontWeight={700} sx={{ color: '#1f2937', flex: 1 }}>
                          {permission.title}
                        </Typography>
                        <Chip
                          label={getStatusLabel(permission.status)}
                          sx={{
                            bgcolor: getStatusColor(permission.status),
                            color: 'white',
                            fontWeight: 700,
                            fontSize: 12,
                          }}
                        />
                      </Stack>

                      {/* Type */}
                      <Box>
                        <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600 }}>
                          Type
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#1f2937' }}>
                          {permission.type.replace('-', ' ').charAt(0).toUpperCase() +
                            permission.type.replace('-', ' ').slice(1)}
                        </Typography>
                      </Box>

                      {/* Description */}
                      <Box>
                        <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600 }}>
                          Description
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#4b5563', mt: 0.5 }}>
                          {permission.description}
                        </Typography>
                      </Box>

                      {/* Dates */}
                      <Box>
                        <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600 }}>
                          Duration
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#1f2937', mt: 0.5 }}>
                          {new Date(permission.startDate).toLocaleDateString('en-GB')} -{' '}
                          {new Date(permission.endDate).toLocaleDateString('en-GB')}
                        </Typography>
                      </Box>

                      {/* Remarks */}
                      {permission.remarks && (
                        <Box sx={{ bgcolor: '#f0f2f5', p: 1.5, borderRadius: 1 }}>
                          <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600 }}>
                            Admin Remarks
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#1f2937', mt: 0.5 }}>
                            {permission.remarks}
                          </Typography>
                        </Box>
                      )}

                      {/* Date */}
                      <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                        Requested: {new Date(permission.createdAt).toLocaleDateString('en-GB')}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Modal */}
        <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 800, fontSize: 20, color: '#1f2937' }}>
            Request Permission
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <form onSubmit={handleSubmit} noValidate>
              <Stack spacing={3}>
                <TextField
                  select
                  label="Type"
                  fullWidth
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                  variant="outlined"
                  size="small"
                  SelectProps={{ native: true }}
                >
                  <option value="event">Event</option>
                  <option value="party">Party</option>
                  <option value="renovation">Renovation</option>
                  <option value="guest-stay">Guest Stay</option>
                  <option value="parking">Extra Parking</option>
                  <option value="loud-music">Loud Music</option>
                  <option value="moving">Moving/Shifting</option>
                  <option value="other">Other</option>
                </TextField>
                <TextField
                  label="Title"
                  fullWidth
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  variant="outlined"
                  size="small"
                  placeholder="Brief title of your request"
                />
                <TextField
                  label="Description"
                  fullWidth
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  variant="outlined"
                  multiline
                  rows={4}
                  placeholder="Provide details about your request"
                />
                <TextField
                  label="Start Date"
                  fullWidth
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="End Date"
                  fullWidth
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Stack>
            </form>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setShowModal(false)} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                bgcolor: '#f59e0b',
                color: 'white',
                fontWeight: 700,
                '&:hover': { bgcolor: '#d97706' },
              }}
            >
              Submit Request
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
};

export default Permissions;
