import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getComplaints, updateComplaint } from '../../services/api';
import { FaEdit, FaTimes } from 'react-icons/fa';
import '../resident/Complaints.css';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [updateData, setUpdateData] = useState({
    status: '',
    priority: '',
    remarks: '',
    assignedTo: '',
    category: '',
    assignedName: '',
    assignedNumber: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const complaintsRes = await getComplaints();
      setComplaints(complaintsRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateComplaint(selectedComplaint._id, updateData);
      toast.success('Complaint updated successfully');
      setSelectedComplaint(null);
      fetchData();
    } catch (error) {
      toast.error('Failed to update complaint');
    }
  };

  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    setUpdateData({
      status: complaint.status,
      priority: complaint.priority,
      remarks: complaint.remarks || '',
      category: complaint.category || ''
    });
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
        <div className="loading"><div className="spinner"></div></div>
      </>
    );
  }

  return (
      <div className="page-container">
        <div className="page-header">
          <h1>Manage Complaints</h1>
          <p>Total: {complaints.length} complaints</p>
        </div>

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
                <strong>Resident:</strong> {complaint.resident?.name} ({complaint.resident?.flatNumber})
              </p>
              <p className="complaint-category">
                Category: <strong>{complaint.category}</strong> | Priority: <strong>{complaint.priority}</strong>
              </p>
              <p className="complaint-description">{complaint.description}</p>
              
              {complaint.assignedTo && (
                <p className="complaint-category">
                  <strong>Assigned to:</strong> {complaint.assignedTo.name}
                </p>
              )}
              
              <p className="complaint-date">
                Created: {new Date(complaint.createdAt).toLocaleDateString('en-GB')}
              </p>

              <button className="btn btn-primary btn-sm mt-1" onClick={() => openModal(complaint)}>
                <FaEdit /> Update
              </button>
            </div>
          ))}
        </div>

        {selectedComplaint && (
          <div className="modal-overlay" onClick={() => setSelectedComplaint(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Update Complaint</h2>
                <button className="close-btn" onClick={() => setSelectedComplaint(null)}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={updateData.status}
                    onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select
                    className="form-select"
                    value={updateData.priority}
                    onChange={(e) => setUpdateData({ ...updateData, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={updateData.category}
                    onChange={(e) => setUpdateData({...updateData, category: e.target.value})}
                  >
                    <option value="electrician">Electrician</option>
                    <option value="plumber">Plumber</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="other">Other</option>
                  </select>
                </div>



                <div className="form-group">
                  <label className="form-label">Assigned Name</label>
                  <input
                    type="text"
                    placeholder="Assigned Name"
                    value={updateData.assignedName}
                    onChange={(e) => setUpdateData({...updateData, assignedName: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Assigned Number</label>
                  <input
                    type="text"
                    placeholder="Assigned Number"
                    value={updateData.assignedNumber}
                    onChange={(e) => setUpdateData({...updateData, assignedNumber: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Remarks</label>
                  <textarea
                    className="form-textarea"
                    value={updateData.remarks}
                    onChange={(e) => setUpdateData({ ...updateData, remarks: e.target.value })}
                    placeholder="Add remarks or updates"
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setSelectedComplaint(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Complaint
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
  );
};

export default AdminComplaints;
