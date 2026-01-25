import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showToast } from '../utils/notifications';
import { AuthContext } from '../context/AuthContext';
import { login as loginAPI } from '../services/api';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await loginAPI(formData);
      if (data.role === 'admin') {
        showToast('Admins please use the Admin Panel (opens in new tab).', 'info');
        window.open('https://taupe-rugelach-625903.netlify.app/login', '_blank', 'noopener');
        return;
      }
      login(data);
      showToast('Login successful!', 'success');
      navigate('/dashboard');
    } catch (error) {
      showToast(error.response?.data?.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🏢 Smart Society</h1>
          <h2>Welcome Back</h2>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-note" style={{ marginTop: '16px', fontSize: '0.9rem', color: '#444' }}>
          User ID can only be created by admin. Open admin login here:
          {' '}
          <a href="https://my-smart-society-admin.netlify.app" target="_blank" rel="noreferrer">
            my-smart-society-admin.netlify.app (tap here)
          </a>
        </p>

        <div style={{ marginTop: '24px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '6px', fontSize: '0.85rem', color: '#666' }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>Demo Resident (by Anshukumar Sharma)</p>
          <p style={{ margin: '4px 0' }}>Email: user@demo.com</p>
          <p style={{ margin: '4px 0' }}>Password: user123</p>
        </div>

      </div>
    </div>
  );
};

export default Login;
