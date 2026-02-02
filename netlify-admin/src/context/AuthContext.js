import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Demo admin user for Netlify deployment
const DEMO_ADMIN = {
  _id: 'demo-admin-001',
  name: 'Admin Demo',
  email: 'admin@society.com',
  role: 'admin',
  phone: '9876543210',
  building: 'Tower A',
  flatNumber: '101'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo mode: Auto-login with demo user
    setUser(DEMO_ADMIN);
    localStorage.setItem('userInfo', JSON.stringify(DEMO_ADMIN));
    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    // Auto-login with demo user again (for demo mode)
    setUser(DEMO_ADMIN);
    localStorage.setItem('userInfo', JSON.stringify(DEMO_ADMIN));
  };

  const updateUser = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
