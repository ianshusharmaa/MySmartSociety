import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ResidentDashboard from './pages/resident/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import Complaints from './pages/resident/Complaints';
import Permissions from './pages/resident/Permissions';
import Maintenance from './pages/resident/Maintenance';
import Events from './pages/resident/Events';
import Notices from './pages/resident/Notices';
import Profile from './pages/Profile';

// Admin Pages
import AdminComplaints from './pages/admin/Complaints';
import AdminPermissions from './pages/admin/Permissions';
import AdminMaintenance from './pages/admin/Maintenance';
import AdminEvents from './pages/admin/Events';
import AdminNotices from './pages/admin/Notices';
import AdminUsers from './pages/admin/Users';

// Components
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './layout/AdminLayout';
import ResidentLayout from './layout/ResidentLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Resident Panel */}
            <Route path="/dashboard" element={<PrivateRoute><ResidentLayout><ResidentDashboard /></ResidentLayout></PrivateRoute>} />
            <Route path="/complaints" element={<PrivateRoute><ResidentLayout><Complaints /></ResidentLayout></PrivateRoute>} />
            <Route path="/permissions" element={<PrivateRoute><ResidentLayout><Permissions /></ResidentLayout></PrivateRoute>} />
            <Route path="/maintenance" element={<PrivateRoute><ResidentLayout><Maintenance /></ResidentLayout></PrivateRoute>} />
            <Route path="/events" element={<PrivateRoute><ResidentLayout><Events /></ResidentLayout></PrivateRoute>} />
            <Route path="/notices" element={<PrivateRoute><ResidentLayout><Notices /></ResidentLayout></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ResidentLayout><Profile /></ResidentLayout></PrivateRoute>} />

            {/* Admin Panel */}
            <Route path="/admin/dashboard" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
            <Route path="/admin/complaints" element={<AdminRoute><AdminLayout><AdminComplaints /></AdminLayout></AdminRoute>} />
            <Route path="/admin/permissions" element={<AdminRoute><AdminLayout><AdminPermissions /></AdminLayout></AdminRoute>} />
            <Route path="/admin/maintenance" element={<AdminRoute><AdminLayout><AdminMaintenance /></AdminLayout></AdminRoute>} />
            <Route path="/admin/events" element={<AdminRoute><AdminLayout><AdminEvents /></AdminLayout></AdminRoute>} />
            <Route path="/admin/notices" element={<AdminRoute><AdminLayout><AdminNotices /></AdminLayout></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminLayout><AdminUsers /></AdminLayout></AdminRoute>} />

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
