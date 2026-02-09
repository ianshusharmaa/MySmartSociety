import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './Settings.css';

// Icons
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    twoFactorAuth: false,
    autoSavePassword: true,
    language: 'en'
  });

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleLanguageChange = (e) => {
    setSettings(prev => ({
      ...prev,
      language: e.target.value
    }));
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>
      
      {/* Appearance Section */}
      <div className="settings-card">
        <div className="settings-header">
          <LightModeIcon className="section-icon" />
          <h3>Appearance</h3>
        </div>
        <div className="settings-content">
          <div className="setting-item">
            <div className="setting-info">
              <h4>Dark Mode</h4>
              <p>Switch between light and dark theme</p>
            </div>
            <div className="theme-toggle" onClick={toggleTheme}>
              <div className={`toggle-slider ${isDarkMode ? 'active' : ''}`}>
                {isDarkMode ? <DarkModeIcon className="toggle-icon" /> : <LightModeIcon className="toggle-icon" />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="settings-card">
        <div className="settings-header">
          <NotificationsIcon className="section-icon" />
          <h3>Notifications</h3>
        </div>
        <div className="settings-content">
          <div className="setting-item">
            <div className="setting-info">
              <h4>Email Notifications</h4>
              <p>Receive updates via email</p>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.emailNotifications}
                onChange={() => handleSettingChange('emailNotifications')}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <h4>Push Notifications</h4>
              <p>Get real-time alerts</p>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.pushNotifications}
                onChange={() => handleSettingChange('pushNotifications')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      {/* Privacy & Security Section */}
      <div className="settings-card">
        <div className="settings-header">
          <SecurityIcon className="section-icon" />
          <h3>Privacy & Security</h3>
        </div>
        <div className="settings-content">
          <div className="setting-item">
            <div className="setting-info">
              <h4>Two-Factor Authentication</h4>
              <p>Add extra security to your account</p>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.twoFactorAuth}
                onChange={() => handleSettingChange('twoFactorAuth')}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <h4>Auto-save Password</h4>
              <p>Remember password on this device</p>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={settings.autoSavePassword}
                onChange={() => handleSettingChange('autoSavePassword')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div className="settings-card">
        <div className="settings-header">
          <PersonIcon className="section-icon" />
          <h3>Account</h3>
        </div>
        <div className="settings-content">
          <div className="setting-item">
            <div className="setting-info">
              <h4>Language</h4>
              <p>Select your preferred language</p>
            </div>
            <select 
              className="language-select"
              value={settings.language}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
