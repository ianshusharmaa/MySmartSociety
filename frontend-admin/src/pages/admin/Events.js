import React, { useState, useEffect } from 'react';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../services/api';
import { FaCalendar, FaPlus, FaEdit, FaTrash, FaTimes, FaUsers, FaRupeeSign } from 'react-icons/fa';
import { showToast, showConfirm } from '../../utils/notifications';
import './Events.css';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'festival',
    targetAmount: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data } = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      showToast('Failed to fetch events', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      category: 'festival',
      targetAmount: '',
      startDate: '',
      endDate: ''
    });
    setShowModal(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      category: event.category,
      targetAmount: event.targetAmount,
      startDate: event.startDate ? event.startDate.split('T')[0] : '',
      endDate: event.endDate ? event.endDate.split('T')[0] : ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.targetAmount || !formData.category || !formData.startDate || !formData.endDate) {
      showToast('Please fill in all required fields', 'warning');
      return;
    }

    if (formData.targetAmount <= 0) {
      showToast('Target amount must be greater than 0', 'warning');
      return;
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      showToast('End date must be after start date', 'warning');
      return;
    }

    try {
      if (editingEvent) {
        await updateEvent(editingEvent._id, formData);
        showToast('Event updated successfully!', 'success');
      } else {
        await createEvent(formData);
        showToast('Event created successfully!', 'success');
      }
      setShowModal(false);
      fetchEvents();
    } catch (error) {
      console.error('Failed to save event:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Failed to save event';
      showToast(`Error: ${errorMsg}`, 'error');
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await showConfirm('Are you sure you want to delete this event?');
    if (!confirmed) {
      return;
    }

    try {
      await deleteEvent(id);
      showToast('Event deleted successfully', 'success');
      fetchEvents();
    } catch (error) {
      console.error('Failed to delete event:', error);
      showToast('Failed to delete event', 'error');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'badge-success',
      completed: 'badge-info',
      cancelled: 'badge-danger'
    };
    return `badge ${badges[status]}`;
  };

  const getCategoryBadge = (category) => {
    const badges = {
      festival: 'badge-warning',
      fundraiser: 'badge-success',
      maintenance: 'badge-info',
      social: 'badge-primary'
    };
    return `badge ${badges[category] || 'badge-info'}`;
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
        <h1>Events Management</h1>
        <button className="btn btn-primary" onClick={openCreateModal}>
          <FaPlus /> Create Event
        </button>
      </div>

      {events.length === 0 ? (
        <div className="empty-state">
          <p>No events found. Create your first event!</p>
        </div>
      ) : (
        <div className="complaints-grid">
          {events.map((event) => (
            <div key={event._id} className="complaint-card">
              <div className="complaint-header">
                <div className="event-header-meta">
                  <span className="event-header-icon"><FaCalendar /></span>
                  <h3>{event.title}</h3>
                </div>
                <div className="event-header-badges">
                  <span className={getStatusBadge(event.status)}>
                    {event.status}
                  </span>
                  <span className={getCategoryBadge(event.category)}>
                    {event.category}
                  </span>
                </div>
              </div>

              <p className="complaint-description">{event.description}</p>

              <div className="permission-info">
                <p><strong>Target:</strong> ₹{event.targetAmount?.toLocaleString() || 0}</p>
                <p><strong>Collected:</strong> ₹{event.collectedAmount?.toLocaleString() || 0}</p>
                <p><strong>Progress:</strong> {event.targetAmount > 0 ? Math.round((event.collectedAmount / event.targetAmount) * 100) : 0}%</p>
              </div>

              {(event.startDate || event.endDate) && (
                <div className="permission-dates">
                  <p><strong>Event Duration:</strong></p>
                  {event.startDate && <p>From: {new Date(event.startDate).toLocaleDateString('en-GB')}</p>}
                  {event.endDate && <p>To: {new Date(event.endDate).toLocaleDateString('en-GB')}</p>}
                </div>
              )}

              <p className="complaint-date">
                Created: {new Date(event.createdAt).toLocaleDateString('en-GB')}
              </p>

              <div className="complaint-actions">
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={() => openEditModal(event)}
                >
                  <FaEdit /> Edit
                </button>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(event._id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
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
                  placeholder="Enter event title"
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  placeholder="Enter event description"
                />
              </div>

              <div className="event-form-grid">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="festival">Festival</option>
                    <option value="fundraiser">Fundraiser</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="social">Social Event</option>
                    <option value="ganpati">Ganpati</option>
                    <option value="navratri">Navratri</option>
                    <option value="holi">Holi</option>
                    <option value="diwali">Diwali</option>
                    <option value="annual-function">Annual Function</option>
                    <option value="repairs-fund">Repairs Fund</option>
                    <option value="sports">Sports</option>
                    <option value="cultural">Cultural</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Target Amount (₹) *</label>
                  <input
                    type="number"
                    name="targetAmount"
                    value={formData.targetAmount}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="Enter target amount"
                  />
                </div>
              </div>

              <div className="event-form-grid">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    min={formData.startDate}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingEvent ? 'Update' : 'Create'} Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
