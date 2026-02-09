import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { FaMoon, FaSun, FaPalette, FaBell, FaShieldAlt, FaUser } from 'react-icons/fa';
import './Settings.css';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your preferences and configurations</p>
      </div>

      <div className="settings-grid">
        {/* Appearance Section */}
        <div className="settings-card">
          <div className="settings-card-header">
            <FaPalette className="settings-icon" />
            <h2>Appearance</h2>
          </div>
          <div className="settings-card-content">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Dark Mode</h3>
                <p>Toggle between light and dark theme</p>
              </div>
              <label className="theme-toggle">
                <input 
                  type="checkbox" 
                  checked={isDarkMode}
                  onChange={toggleTheme}
                />
                <span className="toggle-slider">
                  <FaSun className="toggle-icon sun" />
                  <FaMoon className="toggle-icon moon" />
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="settings-card">
          <div className="settings-card-header">
            <FaBell className="settings-icon" />
            <h2>Notifications</h2>
          </div>
          <div className="settings-card-content">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Email Notifications</h3>
                <p>Receive updates via email</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="switch-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h3>Push Notifications</h3>
                <p>Get real-time alerts</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="switch-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="settings-card">
          <div className="settings-card-header">
            <FaShieldAlt className="settings-icon" />
            <h2>Privacy & Security</h2>
          </div>
          <div className="settings-card-content">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Two-Factor Authentication</h3>
                <p>Add extra security to your account</p>
              </div>
              <button className="settings-btn">Enable</button>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h3>Change Password</h3>
                <p>Update your account password</p>
              </div>
              <button className="settings-btn">Update</button>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="settings-card">
          <div className="settings-card-header">
            <FaUser className="settings-icon" />
            <h2>Account</h2>
          </div>
          <div className="settings-card-content">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Profile Information</h3>
                <p>Update your personal details</p>
              </div>
              <button className="settings-btn">Edit Profile</button>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h3>Language</h3>
                <p>Choose your preferred language</p>
              </div>
              <select className="settings-select">
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
