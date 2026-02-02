import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './assets/theme';

// Resident-facing pages
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import ResidentDashboard from './pages/resident/Dashboard';
import Complaints from './pages/resident/Complaints';
import Permissions from './pages/resident/Permissions';
import Maintenance from './pages/resident/Maintenance';
import Events from './pages/resident/Events';
import Notices from './pages/resident/Notices';
import Profile from './pages/Profile';

// Components
import PrivateRoute from './components/PrivateRoute';
import ResidentLayout from './layout/ResidentLayout';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/welcome" element={<Welcome />} />

              {/* Resident Panel */}
              <Route path="/dashboard" element={<PrivateRoute><ResidentLayout><ResidentDashboard /></ResidentLayout></PrivateRoute>} />
              <Route path="/complaints" element={<PrivateRoute><ResidentLayout><Complaints /></ResidentLayout></PrivateRoute>} />
              <Route path="/permissions" element={<PrivateRoute><ResidentLayout><Permissions /></ResidentLayout></PrivateRoute>} />
              <Route path="/maintenance" element={<PrivateRoute><ResidentLayout><Maintenance /></ResidentLayout></PrivateRoute>} />
              <Route path="/events" element={<PrivateRoute><ResidentLayout><Events /></ResidentLayout></PrivateRoute>} />
              <Route path="/notices" element={<PrivateRoute><ResidentLayout><Notices /></ResidentLayout></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><ResidentLayout><Profile /></ResidentLayout></PrivateRoute>} />

              {/* Default Route */}
              <Route path="/" element={<Navigate to="/welcome" replace />} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
