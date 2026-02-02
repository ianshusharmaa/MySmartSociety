import React, { useState, useEffect } from 'react';
import { showToast } from '../../utils/notifications';
import { getComplaints, createComplaint } from '../../services/api';
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
import AssignmentIcon from '@mui/icons-material/Assignment';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'water',
    description: '',
    priority: 'medium',
  });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const { data } = await getComplaints();
      setComplaints(data);
    } catch (error) {
      showToast('Failed to fetch complaints', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComplaint(formData);
      showToast('Complaint raised successfully', 'success');
      setShowModal(false);
      setFormData({ title: '', category: 'water', description: '', priority: 'medium' });
      fetchComplaints();
    } catch (error) {
      showToast('Failed to create complaint', 'error');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      'in-progress': '#3b82f6',
      resolved: '#10b981',
    };
    return colors[status] || '#6b7280';
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
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
            My Complaints
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setShowModal(true)}
            sx={{
              bgcolor: '#ef4444',
              color: 'white',
              fontWeight: 700,
              '&:hover': { bgcolor: '#dc2626' },
            }}
          >
            Raise Complaint
          </Button>
        </Stack>

        {/* Complaints List */}
        {complaints.length === 0 ? (
          <Card sx={{ bgcolor: '#f0f2f5', border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <AssignmentIcon sx={{ fontSize: 64, color: '#d1d5db', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#6b7280', mb: 2 }}>
                No Complaints Found
              </Typography>
              <Button
                variant="contained"
                onClick={() => setShowModal(true)}
                sx={{
                  bgcolor: '#ef4444',
                  color: 'white',
                  '&:hover': { bgcolor: '#dc2626' },
                }}
              >
                Raise Your First Complaint
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {complaints.map((complaint) => (
              <Grid item xs={12} md={6} key={complaint._id}>
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
                          {complaint.title}
                        </Typography>
                        <Chip
                          label={getStatusLabel(complaint.status)}
                          sx={{
                            bgcolor: getStatusColor(complaint.status),
                            color: 'white',
                            fontWeight: 700,
                            fontSize: 12,
                          }}
                        />
                      </Stack>

                      {/* Category */}
                      <Box>
                        <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600 }}>
                          Category
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#1f2937' }}>
                          {complaint.category.charAt(0).toUpperCase() + complaint.category.slice(1)}
                        </Typography>
                      </Box>

                      {/* Priority */}
                      <Box>
                        <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600 }}>
                          Priority
                        </Typography>
                        <Chip
                          label={complaint.priority}
                          size="small"
                          sx={{
                            mt: 0.5,
                            bgcolor:
                              complaint.priority === 'high'
                                ? 'rgba(239, 68, 68, 0.2)'
                                : complaint.priority === 'medium'
                                ? 'rgba(245, 158, 11, 0.2)'
                                : 'rgba(107, 114, 128, 0.2)',
                            color:
                              complaint.priority === 'high'
                                ? '#dc2626'
                                : complaint.priority === 'medium'
                                ? '#d97706'
                                : '#6b7280',
                            fontWeight: 700,
                          }}
                        />
                      </Box>

                      {/* Description */}
                      <Box>
                        <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600 }}>
                          Description
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#4b5563', mt: 0.5 }}>
                          {complaint.description}
                        </Typography>
                      </Box>

                      {/* Remarks */}
                      {complaint.remarks && (
                        <Box sx={{ bgcolor: '#f0f2f5', p: 1.5, borderRadius: 1 }}>
                          <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600 }}>
                            Admin Remarks
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#1f2937', mt: 0.5 }}>
                            {complaint.remarks}
                          </Typography>
                        </Box>
                      )}

                      {/* Date */}
                      <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                        Created: {new Date(complaint.createdAt).toLocaleDateString('en-GB')}
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
            Raise New Complaint
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <form onSubmit={handleSubmit} noValidate>
              <Stack spacing={3}>
                <TextField
                  label="Title"
                  fullWidth
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  variant="outlined"
                  size="small"
                />
                <TextField
                  select
                  label="Category"
                  fullWidth
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  variant="outlined"
                  size="small"
                  SelectProps={{ native: true }}
                >
                  <option value="water">Water</option>
                  <option value="electricity">Electricity</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="security">Security</option>
                  <option value="parking">Parking</option>
                  <option value="lift">Lift</option>
                  <option value="noise">Noise</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="other">Other</option>
                </TextField>
                <TextField
                  select
                  label="Priority"
                  fullWidth
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  required
                  variant="outlined"
                  size="small"
                  SelectProps={{ native: true }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </TextField>
                <TextField
                  label="Description"
                  fullWidth
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  variant="outlined"
                  multiline
                  rows={4}
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
                bgcolor: '#ef4444',
                color: 'white',
                fontWeight: 700,
                '&:hover': { bgcolor: '#dc2626' },
              }}
            >
              Submit Complaint
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
};

export default Complaints;
