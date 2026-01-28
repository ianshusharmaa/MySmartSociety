import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getComplaints, createComplaint } from '../../services/api';
import Navbar from '../../components/Navbar';
import { FaPlus, FaTimes } from 'react-icons/fa';
import './Complaints.css';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'water',
    description: '',
    priority: 'medium'
  });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const { data } = await getComplaints();
      setComplaints(data);
    } catch (error) {
      toast.error('Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComplaint(formData);
      toast.success('Complaint raised successfully');
      setShowModal(false);
      setFormData({ title: '', category: 'water', description: '', priority: 'medium' });
      fetchComplaints();
    } catch (error) {
      toast.error('Failed to create complaint');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-warning',
      'in-progress': 'badge-info',
      resolved: 'badge-success'
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
          <h1>My Complaints</h1>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <FaPlus /> Raise Complaint
          </button>
        </div>

        {complaints.length === 0 ? (
          <div className="empty-state">
            <p>No complaints found</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              Raise Your First Complaint
            </button>
          </div>
        ) : (
          <div className="complaints-grid">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="complaint-card">
                <div className="complaint-header">
                  <h3>{complaint.title}</h3>
                  <span className={getStatusBadge(complaint.status)}>
                    {complaint.status}
                  </span>
                </div>
                <p className="complaint-category">
                  Category: <strong>{complaint.category}</strong>
                </p>
                <p className="complaint-description">{complaint.description}</p>
                {complaint.remarks && (
                  <div className="complaint-remarks">
                    <strong>Admin Remarks:</strong> {complaint.remarks}
                  </div>
                )}
                <p className="complaint-date">
                  Created: {new Date(complaint.createdAt).toLocaleDateString('en-GB')}
                </p>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Raise New Complaint</h2>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
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
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select
                    className="form-select"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Complaint
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

export default Complaints;
