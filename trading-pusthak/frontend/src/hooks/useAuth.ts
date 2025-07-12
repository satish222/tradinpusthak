import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { User } from '../types';
import { authAPI } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { email: string; password: string; name: string }) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await authAPI.getProfile();
          if (response.success) {
            setUser(response.data);
          } else {
            localStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error('Error getting profile:', error);
          localStorage.removeItem('authToken');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      if (response.success) {
        setUser(response.data.user);
        localStorage.setItem('authToken', response.data.token);
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: { email: string; password: string; name: string }) => {
    try {
      const response = await authAPI.register(userData);
      if (response.success) {
        setUser(response.data.user);
        localStorage.setItem('authToken', response.data.token);
      } else {
        throw new Error(response.error || 'Registration failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('authToken');
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Mock auth hook for development (when backend is not available)
export const useMockAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('mockUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      name: 'Demo User',
      settings: {
        theme: 'light',
        defaultInstrument: 'NIFTY',
        defaultProductType: 'MIS',
        defaultStrategies: ['Breakout', 'Scalping'],
        timezone: 'Asia/Kolkata',
        timeFormat: '24h',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    localStorage.setItem('authToken', 'mock-token');
    setIsLoading(false);
  };

  const register = async (userData: { email: string; password: string; name: string }) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email: userData.email,
      name: userData.name,
      settings: {
        theme: 'light',
        defaultInstrument: 'NIFTY',
        defaultProductType: 'MIS',
        defaultStrategies: [],
        timezone: 'Asia/Kolkata',
        timeFormat: '24h',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    localStorage.setItem('authToken', 'mock-token');
    setIsLoading(false);
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('mockUser');
    localStorage.removeItem('authToken');
  };

  return {
    user,
    login,
    register,
    logout,
    isLoading,
  };
};