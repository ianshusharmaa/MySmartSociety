import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import ResidentLayout from './layout/ResidentLayout';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Routes>
              {/* Demo Mode: Direct access to all pages */}
              <Route path="/" element={<ResidentLayout><ResidentDashboard /></ResidentLayout>} />
              <Route path="/dashboard" element={<ResidentLayout><ResidentDashboard /></ResidentLayout>} />
              <Route path="/complaints" element={<ResidentLayout><Complaints /></ResidentLayout>} />
              <Route path="/permissions" element={<ResidentLayout><Permissions /></ResidentLayout>} />
              <Route path="/maintenance" element={<ResidentLayout><Maintenance /></ResidentLayout>} />
              <Route path="/events" element={<ResidentLayout><Events /></ResidentLayout>} />
              <Route path="/notices" element={<ResidentLayout><Notices /></ResidentLayout>} />
              <Route path="/profile" element={<ResidentLayout><Profile /></ResidentLayout>} />
              
              {/* Public Routes (for reference) */}
              <Route path="/login" element={<Login />} />
              <Route path="/welcome" element={<Welcome />} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
