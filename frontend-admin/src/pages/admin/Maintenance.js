import React, { useState, useEffect } from 'react';
import { getMaintenanceRecords, createMaintenanceRecord, getAllUsers } from '../../services/api';
import { FaMoneyBill, FaPlus, FaTimes, FaFilter, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { showToast } from '../../utils/notifications';
import './Maintenance.css';

const AdminMaintenance = () => {
  const [records, setRecords] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    resident: '',
    amount: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    dueDate: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [recordsRes, usersRes] = await Promise.all([
        getMaintenanceRecords(),
        getAllUsers()
      ]);
      setRecords(recordsRes.data);
      // Filter only residents
      setUsers(usersRes.data.filter(user => user.role === 'resident'));
    } catch (error) {
      console.error('Failed to fetch data:', error);
      showToast('Failed to fetch maintenance records', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openCreateModal = () => {
    setFormData({
      resident: '',
      amount: '',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      dueDate: ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.resident || !formData.amount || !formData.dueDate) {
      showToast('Please fill in all required fields', 'warning');
      return;
    }

    try {
      await createMaintenanceRecord(formData);
      showToast('Maintenance record created successfully', 'success');
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error('Failed to create maintenance record:', error);
      showToast(error.response?.data?.message || 'Failed to create maintenance record', 'error');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      paid: 'badge-success',
      pending: 'badge-warning',
      overdue: 'badge-danger'
    };
    return `badge ${badges[status]}`;
  };

  const getStatusIcon = (status) => {
    const icons = {
      paid: <FaCheckCircle />,
      pending: <FaClock />,
      overdue: <FaExclamationTriangle />
    };
    return icons[status];
  };

  const filteredRecords = records.filter(record => {
    if (filter === 'all') return true;
    return record.status === filter;
  });

  const stats = {
    total: records.length,
    paid: records.filter(r => r.status === 'paid').length,
    pending: records.filter(r => r.status === 'pending').length,
    overdue: records.filter(r => r.status === 'overdue').length,
    totalAmount: records.reduce((sum, r) => sum + r.amount, 0),
    collectedAmount: records.filter(r => r.status === 'paid').reduce((sum, r) => sum + r.amount, 0)
  };

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
        <h1>Maintenance Management</h1>
        <button className="btn btn-primary" onClick={openCreateModal}>
          <FaPlus /> Create Record
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total Records</p>
        </div>
        <div className="stat-card success">
          <h3>{stats.paid}</h3>
          <p>Paid</p>
        </div>
        <div className="stat-card warning">
          <h3>{stats.pending}</h3>
          <p>Pending</p>
        </div>
        <div className="stat-card danger">
          <h3>{stats.overdue}</h3>
          <p>Overdue</p>
        </div>
        <div className="stat-card">
          <h3>₹{stats.collectedAmount.toLocaleString()}</h3>
          <p>Collected</p>
        </div>
        <div className="stat-card">
          <h3>₹{stats.totalAmount.toLocaleString()}</h3>
          <p>Total Amount</p>
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
          className={`filter-btn ${filter === 'paid' ? 'active' : ''}`}
          onClick={() => setFilter('paid')}
        >
          Paid
        </button>
        <button 
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={`filter-btn ${filter === 'overdue' ? 'active' : ''}`}
          onClick={() => setFilter('overdue')}
        >
          Overdue
        </button>
      </div>

      {filteredRecords.length === 0 ? (
        <div className="empty-state">
          <p>No maintenance records found</p>
        </div>
      ) : (
        <div className="complaints-grid">
          {filteredRecords.map((record) => (
            <div key={record._id} className="complaint-card">
              <div className="complaint-header">
                <div className="maintenance-header-meta">
                  <span className="maintenance-header-icon"><FaMoneyBill /></span>
                  <h3>{record.resident?.name || 'N/A'}</h3>
                </div>
                <span className={getStatusBadge(record.status)}>
                  {getStatusIcon(record.status)} {record.status}
                </span>
              </div>

              <div className="permission-info">
                <p><strong>Flat:</strong> {record.resident?.flatNumber || 'N/A'}, Building: {record.resident?.building || 'N/A'}</p>
                <p><strong>Email:</strong> {record.resident?.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {record.resident?.phone || 'N/A'}</p>
              </div>

              <div className="maintenance-summary">
                <p className="maintenance-period"><strong>Period:</strong> {monthNames[record.period.month - 1]} {record.period.year}</p>
                <p className="maintenance-amount">₹{record.amount.toLocaleString()}</p>
              </div>

              <div className="maintenance-dates">
                <span>Due: {new Date(record.dueDate).toLocaleDateString('en-GB')}</span>
                {record.paymentDate && (
                  <span>Paid: {new Date(record.paymentDate).toLocaleDateString('en-GB')}</span>
                )}
              </div>

              {record.transactionId && (
                <p className="maintenance-transaction">
                  <strong>Transaction ID:</strong> {record.transactionId}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create Maintenance Record</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select Resident *</label>
                <select
                  name="resident"
                  value={formData.resident}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select Resident --</option>
                  {users.map(user => (
                    <option key={user._id} value={user._id}>
                      {user.name} - Flat {user.flatNumber}, {user.building}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Amount (₹) *</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  min="0"
                  placeholder="Enter maintenance amount"
                />
              </div>

              <div className="maintenance-form-grid">
                <div className="form-group">
                  <label>Month *</label>
                  <select
                    name="month"
                    value={formData.month}
                    onChange={handleInputChange}
                    required
                  >
                    {monthNames.map((month, index) => (
                      <option key={index} value={index + 1}>{month}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Year *</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    min="2020"
                    max="2030"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Due Date *</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMaintenance;
