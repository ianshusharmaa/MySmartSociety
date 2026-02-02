import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Demo resident user for Netlify deployment
const DEMO_RESIDENT = {
  _id: 'demo-resident-001',
  name: 'Anshu',
  email: 'user@demo.com',
  role: 'resident',
  phone: '9876543210',
  building: 'Tower B',
  flatNumber: '205'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo mode: Auto-login with demo user
    setUser(DEMO_RESIDENT);
    localStorage.setItem('userInfo', JSON.stringify(DEMO_RESIDENT));
    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    // Auto-login with demo user again (for demo mode)
    setUser(DEMO_RESIDENT);
    localStorage.setItem('userInfo', JSON.stringify(DEMO_RESIDENT));
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
