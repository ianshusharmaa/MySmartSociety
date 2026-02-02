import React, { useState, useEffect } from 'react';
import { getPermissions, updatePermission, deletePermission } from '../../services/api';
import { FaCheck, FaTimes, FaTrash, FaFilter } from 'react-icons/fa';
import { showToast, showConfirm } from '../../utils/notifications';
import './Permissions.css';

const AdminPermissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [reviewData, setReviewData] = useState({ status: '', remarks: '' });

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const { data } = await getPermissions();
      setPermissions(data);
    } catch (error) {
      console.error('Failed to fetch permissions:', error);
      showToast('Failed to fetch permissions', 'error');
    } finally {
      setLoading(false);
    }
  };

  const openReviewModal = (permission, status) => {
    setSelectedPermission(permission);
    setReviewData({ status, remarks: '' });
    setShowReviewModal(true);
  };

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      await updatePermission(selectedPermission._id, reviewData);
      showToast(`Permission ${reviewData.status} successfully`, 'success');
      setShowReviewModal(false);
      fetchPermissions();
    } catch (error) {
      console.error('Failed to update permission:', error);
      showToast('Failed to update permission', 'error');
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await showConfirm('Are you sure you want to delete this permission request?');
    if (!confirmed) {
      return;
    }
    try {
      await deletePermission(id);
      showToast('Permission deleted successfully', 'success');
      fetchPermissions();
    } catch (error) {
      console.error('Failed to delete permission:', error);
      showToast('Failed to delete permission', 'error');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-warning',
      approved: 'badge-success',
      rejected: 'badge-danger'
    };
    return `badge ${badges[status]}`;
  };

  const filteredPermissions = permissions.filter(permission => {
    if (filter === 'all') return true;
    return permission.status === filter;
  });

  const stats = {
    total: permissions.length,
    pending: permissions.filter(p => p.status === 'pending').length,
    approved: permissions.filter(p => p.status === 'approved').length,
    rejected: permissions.filter(p => p.status === 'rejected').length
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading"><div className="spinner"></div></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Permission Requests Management</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total Requests</p>
        </div>
        <div className="stat-card warning">
          <h3>{stats.pending}</h3>
          <p>Pending</p>
        </div>
        <div className="stat-card success">
          <h3>{stats.approved}</h3>
          <p>Approved</p>
        </div>
        <div className="stat-card danger">
          <h3>{stats.rejected}</h3>
          <p>Rejected</p>
        </div>
      </div>

      <div className="filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
          onClick={() => setFilter('approved')}
        >
          Approved
        </button>
        <button 
          className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          Rejected
        </button>
      </div>

      {filteredPermissions.length === 0 ? (
        <div className="empty-state">
          <p>No permission requests found</p>
        </div>
      ) : (
        <div className="complaints-grid">
          {filteredPermissions.map((permission) => (
            <div key={permission._id} className="complaint-card">
              <div className="complaint-header">
                <h3>{permission.title}</h3>
                <span className={getStatusBadge(permission.status)}>
                  {permission.status}
                </span>
              </div>

              <div className="permission-info">
                <p><strong>Resident:</strong> {permission.resident?.name || 'N/A'}</p>
                <p><strong>Flat:</strong> {permission.resident?.flatNumber || 'N/A'}, Building: {permission.resident?.building || 'N/A'}</p>
                <p><strong>Type:</strong> {permission.type.replace('-', ' ').toUpperCase()}</p>
              </div>

              <p className="complaint-description">{permission.description}</p>

              <div className="permission-dates">
                <p><strong>Duration:</strong></p>
                <p>From: {new Date(permission.startDate).toLocaleDateString('en-GB')}</p>
                <p>To: {new Date(permission.endDate).toLocaleDateString('en-GB')}</p>
              </div>

              {permission.remarks && (
                <div className="complaint-remarks">
                  <strong>Admin Remarks:</strong> {permission.remarks}
                </div>
              )}

              <p className="complaint-date">
                Requested: {new Date(permission.createdAt).toLocaleDateString('en-GB')}
              </p>

              <div className="complaint-actions">
                {permission.status === 'pending' && (
                  <>
                    <button 
                      className="btn btn-sm btn-success"
                      onClick={() => openReviewModal(permission, 'approved')}
                    >
                      <FaCheck /> Approve
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => openReviewModal(permission, 'rejected')}
                    >
                      <FaTimes /> Reject
                    </button>
                  </>
                )}
                <button 
                  className="btn btn-sm btn-outline"
                  onClick={() => handleDelete(permission._id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showReviewModal && selectedPermission && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{reviewData.status === 'approved' ? 'Approve' : 'Reject'} Permission</h2>
              <button className="close-btn" onClick={() => setShowReviewModal(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="permission-details">
              <h3>{selectedPermission.title}</h3>
              <p><strong>Resident:</strong> {selectedPermission.resident?.name}</p>
              <p><strong>Type:</strong> {selectedPermission.type}</p>
            </div>

            <form onSubmit={handleReview}>
              <div className="form-group">
                <label>Remarks (Optional)</label>
                <textarea
                  value={reviewData.remarks}
                  onChange={(e) => setReviewData({ ...reviewData, remarks: e.target.value })}
                  placeholder="Add any remarks or conditions..."
                  rows="4"
                />
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowReviewModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={`btn ${reviewData.status === 'approved' ? 'btn-success' : 'btn-danger'}`}
                >
                  {reviewData.status === 'approved' ? 'Approve' : 'Reject'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPermissions;
