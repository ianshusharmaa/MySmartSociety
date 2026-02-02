import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './assets/theme';

// Auth pages
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminComplaints from './pages/admin/Complaints';
import AdminPermissions from './pages/admin/Permissions';
import AdminMaintenance from './pages/admin/Maintenance';
import AdminEvents from './pages/admin/Events';
import AdminNotices from './pages/admin/Notices';
import AdminUsers from './pages/admin/Users';

// Components
import AdminLayout from './layout/AdminLayout';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Routes>
              {/* Demo Mode: Direct access to all pages */}
              <Route path="/" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
              <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
              <Route path="/admin/complaints" element={<AdminLayout><AdminComplaints /></AdminLayout>} />
              <Route path="/admin/permissions" element={<AdminLayout><AdminPermissions /></AdminLayout>} />
              <Route path="/admin/maintenance" element={<AdminLayout><AdminMaintenance /></AdminLayout>} />
              <Route path="/admin/events" element={<AdminLayout><AdminEvents /></AdminLayout>} />
              <Route path="/admin/notices" element={<AdminLayout><AdminNotices /></AdminLayout>} />
              <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
              
              {/* Public Routes (for reference) */}
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
