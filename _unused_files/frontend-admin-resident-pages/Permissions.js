import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getPermissions, createPermission } from '../../services/api';
import Navbar from '../../components/Navbar';
import { FaPlus, FaTimes } from 'react-icons/fa';
import '../resident/Complaints.css';

const Permissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: 'event',
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const { data } = await getPermissions();
      setPermissions(data);
    } catch (error) {
      toast.error('Failed to fetch permissions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPermission(formData);
      toast.success('Permission request submitted successfully');
      setShowModal(false);
      setFormData({ type: 'event', title: '', description: '', startDate: '', endDate: '' });
      fetchPermissions();
    } catch (error) {
      toast.error('Failed to create permission request');
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

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading"><div className="spinner"></div></div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <h1>Permission Requests</h1>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <FaPlus /> Request Permission
          </button>
        </div>

        {permissions.length === 0 ? (
          <div className="empty-state">
            <p>No permission requests found</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              Create Your First Request
            </button>
          </div>
        ) : (
          <div className="complaints-grid">
            {permissions.map((permission) => (
              <div key={permission._id} className="complaint-card">
                <div className="complaint-header">
                  <h3>{permission.title}</h3>
                  <span className={getStatusBadge(permission.status)}>
                    {permission.status}
                  </span>
                </div>
                <p className="complaint-category">
                  Type: <strong>{permission.type.replace('-', ' ')}</strong>
                </p>
                <p className="complaint-description">{permission.description}</p>
                <p className="complaint-category">
                  From: {new Date(permission.startDate).toLocaleDateString('en-GB')} - 
                  To: {new Date(permission.endDate).toLocaleDateString('en-GB')}
                </p>
                {permission.remarks && (
                  <div className="complaint-remarks">
                    <strong>Admin Remarks:</strong> {permission.remarks}
                  </div>
                )}
                <p className="complaint-date">
                  Requested: {new Date(permission.createdAt).toLocaleDateString('en-GB')}
                </p>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Request Permission</h2>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select
                    className="form-select"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                  >
                    <option value="event">Event</option>
                    <option value="party">Party</option>
                    <option value="renovation">Renovation</option>
                    <option value="guest-stay">Guest Stay</option>
                    <option value="parking">Extra Parking</option>
                    <option value="loud-music">Loud Music</option>
                    <option value="moving">Moving/Shifting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="Brief title of your request"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    placeholder="Provide details about your request"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Permissions;
