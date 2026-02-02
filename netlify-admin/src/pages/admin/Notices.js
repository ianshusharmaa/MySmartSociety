import React, { useState, useEffect } from 'react';
import { getNotices, createNotice, updateNotice, deleteNotice } from '../../services/api';
import { FaBullhorn, FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { showToast, showConfirm } from '../../utils/notifications';
import './Permissions.css';

const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    priority: 'medium',
    expiryDate: ''
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const { data } = await getNotices();
      setNotices(data);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
      showToast('Failed to fetch notices', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openCreateModal = () => {
    setEditingNotice(null);
    setFormData({
      title: '',
      content: '',
      category: 'general',
      priority: 'medium',
      expiryDate: ''
    });
    setShowModal(true);
  };

  const openEditModal = (notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      category: notice.category,
      priority: notice.priority,
      expiryDate: notice.expiryDate ? notice.expiryDate.split('T')[0] : ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      showToast('Please fill in all required fields', 'warning');
      return;
    }

    try {
      if (editingNotice) {
        await updateNotice(editingNotice._id, formData);
        showToast('Notice updated successfully', 'success');
      } else {
        await createNotice(formData);
        showToast('Notice created successfully', 'success');
      }
      setShowModal(false);
      fetchNotices();
    } catch (error) {
      console.error('Failed to save notice:', error);
      showToast('Failed to save notice', 'error');
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await showConfirm('Are you sure you want to delete this notice?');
    if (!confirmed) {
      return;
    }

    try {
      await deleteNotice(id);
      showToast('Notice deleted successfully', 'success');
      fetchNotices();
    } catch (error) {
      console.error('Failed to delete notice:', error);
      showToast('Failed to delete notice', 'error');
    }
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      low: 'badge-info',
      medium: 'badge-warning',
      high: 'badge-danger'
    };
    return `badge ${badges[priority]}`;
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
        <h1>Notices Management</h1>
        <button className="btn btn-primary" onClick={openCreateModal}>
          <FaPlus /> Create Notice
        </button>
      </div>

      {notices.length === 0 ? (
        <div className="empty-state">
          <p>No notices found. Create your first notice!</p>
        </div>
      ) : (
        <div className="complaints-grid">
          {notices.map((notice) => (
            <div key={notice._id} className={`complaint-card notice-${notice.priority}`}>
              <div className="complaint-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <span style={{ fontSize: '24px', color: '#667eea' }}><FaBullhorn /></span>
                  <h3>{notice.title}</h3>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className={getPriorityBadge(notice.priority)}>
                    {notice.priority}
                  </span>
                  <span className="badge badge-info">{notice.category}</span>
                </div>
              </div>

              <p className="complaint-description">{notice.content}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px', color: '#718096' }}>
                  <span>Posted: {new Date(notice.createdAt).toLocaleDateString('en-GB')}</span>
                  {notice.expiryDate && (
                    <span style={{ color: '#ff9800', fontWeight: 500 }}>
                      Expires: {new Date(notice.expiryDate).toLocaleDateString('en-GB')}
                    </span>
                  )}
                </div>
                <div className="complaint-actions">
                  <button 
                    className="btn btn-sm btn-primary" 
                    onClick={() => openEditModal(notice)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button 
                    className="btn btn-sm btn-danger" 
                    onClick={() => handleDelete(notice._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingNotice ? 'Edit Notice' : 'Create New Notice'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter notice title"
                />
              </div>

              <div className="form-group">
                <label>Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  placeholder="Enter notice content"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="general">General</option>
                    <option value="urgent">Urgent</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="event">Event</option>
                    <option value="payment">Payment</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Expiry Date (Optional)</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingNotice ? 'Update' : 'Create'} Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotices;
