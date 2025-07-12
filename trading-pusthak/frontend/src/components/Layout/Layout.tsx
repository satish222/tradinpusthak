import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import Notification from '../UI/Notification';
import { useMockAuth } from '../../hooks/useAuth';

const Layout: React.FC = () => {
  const { user, logout } = useMockAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    isVisible: boolean;
  }>({ message: '', type: 'info', isVisible: false });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setNotification({
        message: 'Logged out successfully',
        type: 'success',
        isVisible: true,
      });
    } catch (error) {
      setNotification({
        message: 'Error logging out',
        type: 'error',
        isVisible: true,
      });
    }
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        onLogout={handleLogout} 
      />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />

      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
  );
};

export default Layout;