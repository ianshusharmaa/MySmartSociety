import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const getProfile = () => api.get('/auth/profile');
export const updateProfile = (userData) => api.put('/auth/profile', userData);
export const getAllUsers = () => api.get('/auth/users');
export const createUser = (userData) => api.post('/auth/users', userData);
export const toggleUserStatus = (userId) => api.put(`/auth/users/${userId}/toggle`);

// Complaints API
export const getComplaints = () => api.get('/complaints');
export const getComplaint = (id) => api.get(`/complaints/${id}`);
export const createComplaint = (data) => api.post('/complaints', data);
export const updateComplaint = (id, data) => api.put(`/complaints/${id}`, data);
export const deleteComplaint = (id) => api.delete(`/complaints/${id}`);
export const getComplaintStats = () => api.get('/complaints/stats');

// Permissions API
export const getPermissions = () => api.get('/permissions');
export const getPermission = (id) => api.get(`/permissions/${id}`);
export const createPermission = (data) => api.post('/permissions', data);
export const updatePermission = (id, data) => api.put(`/permissions/${id}`, data);
export const deletePermission = (id) => api.delete(`/permissions/${id}`);
export const getPermissionStats = () => api.get('/permissions/stats');

// Maintenance API
export const getMaintenanceRecords = () => api.get('/maintenance');
export const getMaintenanceRecord = (id) => api.get(`/maintenance/${id}`);
export const createMaintenanceRecord = (data) => api.post('/maintenance', data);
export const createMaintenanceOrder = (id) => api.post(`/maintenance/${id}/create-order`);
export const verifyMaintenancePayment = (id, data) => api.post(`/maintenance/${id}/verify-payment`, data);
export const getPaymentHistory = () => api.get('/maintenance/history');
export const getMaintenanceStats = () => api.get('/maintenance/stats');

// Events API
export const getEvents = () => api.get('/events');
export const getEvent = (id) => api.get(`/events/${id}`);
export const createEvent = (data) => api.post('/events', data);
export const updateEvent = (id, data) => api.put(`/events/${id}`, data);
export const deleteEvent = (id) => api.delete(`/events/${id}`);
export const createContributionOrder = (id, data) => api.post(`/events/${id}/create-order`, data);
export const contributeToEvent = (id, data) => api.post(`/events/${id}/contribute`, data);
export const getMyContributions = () => api.get('/events/my-contributions');

// Notices API
export const getNotices = () => api.get('/notices');
export const getNotice = (id) => api.get(`/notices/${id}`);
export const createNotice = (data) => api.post('/notices', data);
export const updateNotice = (id, data) => api.put(`/notices/${id}`, data);
export const deleteNotice = (id) => api.delete(`/notices/${id}`);

export default api;
