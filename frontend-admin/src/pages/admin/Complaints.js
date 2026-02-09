import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Chip,
  IconButton,
  Tooltip,
  Tab,
  Tabs,
  LinearProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  Filter as FilterIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { getComplaints, updateComplaint, deleteComplaint } from '../../services/api';
import { toast } from 'react-toastify';
import './Complaints.css';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [updateData, setUpdateData] = useState({
    status: '',
    priority: '',
    remarks: '',
    category: '',
    assignedTo: '',
  });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await getComplaints();
      setComplaints(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch complaints');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (complaint) => {
    setSelectedComplaint(complaint);
    setUpdateData({
      status: complaint.status || 'pending',
      priority: complaint.priority || 'medium',
      remarks: complaint.remarks || '',
      category: complaint.category || '',
      assignedTo: complaint.assignedTo || '',
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedComplaint(null);
  };

  const handleUpdate = async () => {
    try {
      await updateComplaint(selectedComplaint._id, updateData);
      toast.success('Complaint updated successfully');
      handleCloseDialog();
      fetchComplaints();
    } catch (error) {
      toast.error('Failed to update complaint');
      console.error('Error:', error);
    }
  };

  const handleDelete = async (complaintId) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        await deleteComplaint(complaintId);
        toast.success('Complaint deleted successfully');
        fetchComplaints();
      } catch (error) {
        toast.error('Failed to delete complaint');
        console.error('Error:', error);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter complaints
  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = 
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (complaint.resident && complaint.resident.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || complaint.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || complaint.category === filterCategory;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const paginatedComplaints = filteredComplaints.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Statistics
  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'pending').length,
    inProgress: complaints.filter(c => c.status === 'in-progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
    high: complaints.filter(c => c.priority === 'high').length,
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      'in-progress': 'info',
      resolved: 'success',
      closed: 'default',
    };
    return colors[status] || 'default';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'success',
      medium: 'warning',
      high: 'error',
    };
    return colors[priority] || 'default';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      plumbing: '🔧',
      electrical: '⚡',
      maintenance: '🛠️',
      cleanliness: '🧹',
      security: '🔒',
      parking: '🅿️',
      other: '📋',
    };
    return icons[category] || '📋';
  };

  return (
    <div className="complaints-container">
      <div className="complaints-header">
        <div>
          <h1 className="complaints-title">Complaint Management</h1>
          <p className="complaints-subtitle">Track and manage resident complaints</p>
        </div>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          className="btn-export"
        >
          Export Report
        </Button>
      </div>

      {/* Stats Grid */}
      <Grid container spacing={2} className="stats-grid">
        <Grid item xs={12} sm={6} lg={2.4}>
          <Card className="stat-card-mini">
            <CardContent>
              <p className="stat-mini-label">Total Complaints</p>
              <p className="stat-mini-value">{stats.total}</p>
              <LinearProgress
                variant="determinate"
                value={100}
                className="stat-mini-progress"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={2.4}>
          <Card className="stat-card-mini">
            <CardContent>
              <p className="stat-mini-label">Pending</p>
              <p className="stat-mini-value" style={{ color: '#f59e0b' }}>{stats.pending}</p>
              <LinearProgress
                variant="determinate"
                value={(stats.pending / (stats.total || 1)) * 100}
                className="stat-mini-progress warning"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={2.4}>
          <Card className="stat-card-mini">
            <CardContent>
              <p className="stat-mini-label">In Progress</p>
              <p className="stat-mini-value" style={{ color: '#3b82f6' }}>{stats.inProgress}</p>
              <LinearProgress
                variant="determinate"
                value={(stats.inProgress / (stats.total || 1)) * 100}
                className="stat-mini-progress info"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={2.4}>
          <Card className="stat-card-mini">
            <CardContent>
              <p className="stat-mini-label">Resolved</p>
              <p className="stat-mini-value" style={{ color: '#10b981' }}>{stats.resolved}</p>
              <LinearProgress
                variant="determinate"
                value={(stats.resolved / (stats.total || 1)) * 100}
                className="stat-mini-progress success"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={2.4}>
          <Card className="stat-card-mini">
            <CardContent>
              <p className="stat-mini-label">High Priority</p>
              <p className="stat-mini-value" style={{ color: '#ef4444' }}>{stats.high}</p>
              <LinearProgress
                variant="determinate"
                value={(stats.high / (stats.total || 1)) * 100}
                className="stat-mini-progress error"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card className="filter-card">
        <CardContent className="filter-content">
          <div className="filter-row">
            <TextField
              placeholder="Search by title, description, or resident..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
              className="search-field"
            />

            <FormControl size="small" variant="outlined" className="filter-select">
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setPage(0);
                }}
                label="Status"
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="resolved">Resolved</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" variant="outlined" className="filter-select">
              <InputLabel>Priority</InputLabel>
              <Select
                value={filterPriority}
                onChange={(e) => {
                  setFilterPriority(e.target.value);
                  setPage(0);
                }}
                label="Priority"
              >
                <MenuItem value="all">All Priorities</MenuItem>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" variant="outlined" className="filter-select">
              <InputLabel>Category</InputLabel>
              <Select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setPage(0);
                }}
                label="Category"
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="plumbing">Plumbing</MenuItem>
                <MenuItem value="electrical">Electrical</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
                <MenuItem value="cleanliness">Cleanliness</MenuItem>
                <MenuItem value="security">Security</MenuItem>
              </Select>
            </FormControl>
          </div>
          <p className="filter-results">
            Showing {paginatedComplaints.length} of {filteredComplaints.length} complaints
          </p>
        </CardContent>
      </Card>

      {/* Complaints Table */}
      <Card className="table-card">
        <TableContainer>
          {loading ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>Loading complaints...</Box>
          ) : paginatedComplaints.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center', color: '#6b7280' }}>
              No complaints found
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow className="table-header">
                  <TableCell>Title</TableCell>
                  <TableCell>Resident</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedComplaints.map((complaint) => (
                  <TableRow key={complaint._id} className="table-row">
                    <TableCell>
                      <div className="complaint-title-cell">
                        <p className="complaint-title">{complaint.title}</p>
                        <p className="complaint-description-preview">
                          {complaint.description?.substring(0, 60)}...
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {complaint.resident ? (
                        <div className="resident-cell">
                          <p className="resident-name">{complaint.resident.name}</p>
                          <p className="resident-flat">{complaint.resident.flatNo || complaint.resident.flatNumber}</p>
                        </div>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="category-cell">
                        <span className="category-icon">{getCategoryIcon(complaint.category)}</span>
                        <span className="category-name">{complaint.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={complaint.status}
                        size="small"
                        color={getStatusColor(complaint.status)}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={complaint.priority}
                        size="small"
                        color={getPriorityColor(complaint.priority)}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(complaint)}
                          className="btn-edit"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(complaint._id)}
                          className="btn-delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredComplaints.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Update Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Update Complaint
            <IconButton size="small" onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent className="dialog-content">
          {selectedComplaint && (
            <>
              <Box sx={{ mb: 2, p: 2, backgroundColor: '#f3f4f6', borderRadius: 1 }}>
                <p className="dialog-detail-label">Title: <strong>{selectedComplaint.title}</strong></p>
                <p className="dialog-detail-label">Description: {selectedComplaint.description}</p>
                {selectedComplaint.resident && (
                  <p className="dialog-detail-label">
                    Reported by: <strong>{selectedComplaint.resident.name}</strong> (Flat {selectedComplaint.resident.flatNo})
                  </p>
                )}
              </Box>

              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={updateData.status}
                  onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                  label="Status"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Priority</InputLabel>
                <Select
                  value={updateData.priority}
                  onChange={(e) => setUpdateData({ ...updateData, priority: e.target.value })}
                  label="Priority"
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  value={updateData.category}
                  onChange={(e) => setUpdateData({ ...updateData, category: e.target.value })}
                  label="Category"
                >
                  <MenuItem value="plumbing">Plumbing</MenuItem>
                  <MenuItem value="electrical">Electrical</MenuItem>
                  <MenuItem value="maintenance">Maintenance</MenuItem>
                  <MenuItem value="cleanliness">Cleanliness</MenuItem>
                  <MenuItem value="security">Security</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Assigned To"
                value={updateData.assignedTo}
                onChange={(e) => setUpdateData({ ...updateData, assignedTo: e.target.value })}
                margin="normal"
                variant="outlined"
                placeholder="e.g., Technician Name"
              />

              <TextField
                fullWidth
                label="Remarks"
                value={updateData.remarks}
                onChange={(e) => setUpdateData({ ...updateData, remarks: e.target.value })}
                margin="normal"
                variant="outlined"
                multiline
                rows={3}
                placeholder="Add remarks or progress update..."
              />
            </>
          )}
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            color="primary"
          >
            Update Complaint
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminComplaints;
