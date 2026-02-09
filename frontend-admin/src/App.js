import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
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
import AdminSettings from './pages/admin/Settings';
import AdminAnalytics from './pages/admin/Analytics';

// Components
import AdminRoute from './components/AdminRoute';
import AdminLayout from './layout/AdminLayout';

function App() {
  return (
    <AuthProvider>
      <CustomThemeProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <div className="App">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Admin Panel Only */}
                <Route path="/admin/dashboard" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
                <Route path="/admin/complaints" element={<AdminRoute><AdminLayout><AdminComplaints /></AdminLayout></AdminRoute>} />
                <Route path="/admin/permissions" element={<AdminRoute><AdminLayout><AdminPermissions /></AdminLayout></AdminRoute>} />
                <Route path="/admin/maintenance" element={<AdminRoute><AdminLayout><AdminMaintenance /></AdminLayout></AdminRoute>} />
                <Route path="/admin/events" element={<AdminRoute><AdminLayout><AdminEvents /></AdminLayout></AdminRoute>} />
                <Route path="/admin/notices" element={<AdminRoute><AdminLayout><AdminNotices /></AdminLayout></AdminRoute>} />
                <Route path="/admin/users" element={<AdminRoute><AdminLayout><AdminUsers /></AdminLayout></AdminRoute>} />
                <Route path="/admin/analytics" element={<AdminRoute><AdminLayout><AdminAnalytics /></AdminLayout></AdminRoute>} />
                <Route path="/admin/settings" element={<AdminRoute><AdminLayout><AdminSettings /></AdminLayout></AdminRoute>} />
              </Routes>
              <ToastContainer position="top-right" autoClose={3000} />
            </div>
          </Router>
        </ThemeProvider>
      </CustomThemeProvider>
    </AuthProvider>
  );
}

export default App;
