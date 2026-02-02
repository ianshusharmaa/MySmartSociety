import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showToast } from '../utils/notifications';
import { register as registerAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    flatNumber: '',
    building: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'warning');
      return;
    }

    setLoading(true);

    try {
      const { data } = await registerAPI({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        flatNumber: formData.flatNumber,
        building: formData.building
      });
      // Auto-login after successful registration
      login(data);
      showToast('Registration successful! You are now logged in.', 'success');
      navigate('/dashboard');
    } catch (error) {
      showToast(error.response?.data?.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🏢 Smart Society</h1>
          <h2>Create Account</h2>
          <p>Register as a new resident</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

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
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Building</label>
              <input
                type="text"
                name="building"
                className="form-input"
                value={formData.building}
                onChange={handleChange}
                required
                placeholder="Building name/number"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Flat Number</label>
            <input
              type="text"
              name="flatNumber"
              className="form-input"
              value={formData.flatNumber}
              onChange={handleChange}
              required
              placeholder="Enter flat number"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="Enter password"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm password"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
