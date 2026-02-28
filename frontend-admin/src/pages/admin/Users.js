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
  LinearProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { getAllUsers, createUser, toggleUserStatus } from '../../services/api';
import { toast } from 'react-toastify';
import './Users.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    flatNumber: '',
    building: '',
    role: 'resident',
    isActive: true,
    password: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      setUsers(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (user = null) => {
    if (user) {
      setEditingId(user._id);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        flatNumber: user.flatNumber || '',
        building: user.building || '',
        role: user.role || 'resident',
        isActive: user.isActive !== false,
        password: '',
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        flatNumber: '',
        building: '',
        role: 'resident',
        isActive: true,
        password: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
  };

  const handleSaveUser = async () => {
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }

    if (!formData.phone) {
      toast.error('Phone number is required');
      return;
    }

    if (formData.role === 'resident' && (!formData.flatNumber || !formData.building)) {
      toast.error('Flat number and building are required for residents');
      return;
    }

    try {
      if (editingId) {
        // Only toggle status is available via API
        if (formData.isActive !== users.find(u => u._id === editingId)?.isActive) {
          await toggleUserStatus(editingId);
          toast.success('User status updated successfully');
        } else {
          toast.info('No changes made');
        }
      } else {
        if (!formData.password) {
          toast.error('Password is required for new users');
          return;
        }
        await createUser(formData);
        toast.success('User created successfully');
      }
      handleCloseDialog();
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving user');
      console.error('Error:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to deactivate this user?')) {
      try {
        await toggleUserStatus(userId);
        toast.success('User deactivated successfully');
        fetchUsers();
      } catch (error) {
        toast.error('Error deactivating user');
        console.error('Error:', error);
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter and search users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.flatNo && user.flatNo.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' ? user.isActive : !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    residents: users.filter(u => u.role === 'resident').length,
    active: users.filter(u => u.isActive).length,
    inactive: users.filter(u => !u.isActive).length,
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'error',
      resident: 'success',
      manager: 'warning',
    };
    return colors[role] || 'default';
  };

  const getStatusColor = (isActive) => {
    return isActive ? 'success' : 'error';
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <div>
          <h1 className="users-title">User Management</h1>
          <p className="users-subtitle">Manage residents and admin users</p>
        </div>
        <div className="users-actions">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            className="btn-add-user"
          >
            Add New User
          </Button>
          <Tooltip title="Refresh">
            <IconButton onClick={fetchUsers} disabled={loading}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Stats Cards */}
      <Grid container spacing={2} className="stats-grid">
        <Grid item xs={12} sm={6} lg={4}>
          <Card className="stat-card-mini">
            <CardContent>
              <div className="stat-mini-content">
                <div>
                  <p className="stat-mini-label">Total Users</p>
                  <p className="stat-mini-value">{stats.total}</p>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={100}
                  className="stat-mini-progress"
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <Card className="stat-card-mini">
            <CardContent>
              <div className="stat-mini-content">
                <div>
                  <p className="stat-mini-label">Active Users</p>
                  <p className="stat-mini-value">{stats.active}</p>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={(stats.active / (stats.total || 1)) * 100}
                  className="stat-mini-progress success"
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <Card className="stat-card-mini">
            <CardContent>
              <div className="stat-mini-content">
                <div>
                  <p className="stat-mini-label">Admins</p>
                  <p className="stat-mini-value">{stats.admins}</p>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={(stats.admins / (stats.total || 1)) * 100}
                  className="stat-mini-progress warning"
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card className="filter-card">
        <CardContent className="filter-content">
          <div className="filter-row">
            <TextField
              placeholder="Search by name, email, or flat..."
              variant="outlined"
              size="small"
              startAdornment={<SearchIcon className="search-icon" />}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
              className="search-field"
            />
            <FormControl size="small" variant="outlined" className="filter-select">
              <InputLabel>Role</InputLabel>
              <Select
                value={filterRole}
                onChange={(e) => {
                  setFilterRole(e.target.value);
                  setPage(0);
                }}
                label="Role"
              >
                <MenuItem value="all">All Roles</MenuItem>
                <MenuItem value="resident">Resident</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
              </Select>
            </FormControl>

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
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </div>
          <p className="filter-results">
            Showing {paginatedUsers.length} of {filteredUsers.length} users
          </p>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="table-card">
        <TableContainer>
          {loading ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>Loading users...</Box>
          ) : paginatedUsers.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center', color: '#6b7280' }}>
              No users found
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow className="table-header">
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Flat / Building</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user._id} className="table-row">
                    <TableCell className="cell-name">
                      <div className="user-cell">
                        <div className="user-avatar">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="user-name">{user.name}</p>
                          <p className="user-email">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone || '-'}</TableCell>
                    <TableCell>{user.flatNumber || '-'} {user.building || ''}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        size="small"
                        color={getRoleColor(user.role)}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={user.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                        label={user.isActive ? 'Active' : 'Inactive'}
                        size="small"
                        color={getStatusColor(user.isActive)}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(user)}
                          className="btn-edit"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteUser(user._id)}
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
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Add/Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingId ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent className="dialog-content">
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleFormChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            margin="normal"
            variant="outlined"
            required
          />
          
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleFormChange}
              label="Role"
            >
              <MenuItem value="resident">Resident</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
          </FormControl>

          {formData.role === 'resident' && (
            <>
              <TextField
                fullWidth
                label="Flat Number"
                name="flatNumber"
                value={formData.flatNumber}
                onChange={handleFormChange}
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="Building"
                name="building"
                value={formData.building}
                onChange={handleFormChange}
                margin="normal"
                variant="outlined"
                required
              />
            </>
          )}

          {!editingId && (
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleFormChange}
              margin="normal"
              variant="outlined"
              required
            />
          )}

          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              name="isActive"
              value={formData.isActive}
              onChange={handleFormChange}
              label="Status"
            >
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveUser}
            variant="contained"
            color="primary"
          >
            {editingId ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
