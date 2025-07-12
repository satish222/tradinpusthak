import axios, { AxiosResponse } from 'axios';
import { 
  APIResponse, 
  Trade, 
  PsychologyEntry, 
  DashboardData, 
  TradeStats, 
  PaginatedResponse, 
  TradeFilters,
  User,
  UserSettings
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<APIResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData: { email: string; password: string; name: string }): Promise<APIResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: async (): Promise<APIResponse<null>> => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getProfile: async (): Promise<APIResponse<User>> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (userData: Partial<User>): Promise<APIResponse<User>> => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },
};

// Trades API
export const tradesAPI = {
  getTrades: async (page: number = 1, limit: number = 10, filters?: TradeFilters): Promise<APIResponse<PaginatedResponse<Trade>>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'dateRange' && value.start && value.end) {
            params.append('startDate', value.start.toISOString());
            params.append('endDate', value.end.toISOString());
          } else if (key === 'pnlRange' && value.min !== undefined && value.max !== undefined) {
            params.append('minPnL', value.min.toString());
            params.append('maxPnL', value.max.toString());
          } else if (typeof value === 'string') {
            params.append(key, value);
          }
        }
      });
    }

    const response = await api.get(`/trades?${params}`);
    return response.data;
  },

  getTrade: async (id: string): Promise<APIResponse<Trade>> => {
    const response = await api.get(`/trades/${id}`);
    return response.data;
  },

  createTrade: async (tradeData: Omit<Trade, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<APIResponse<Trade>> => {
    const response = await api.post('/trades', tradeData);
    return response.data;
  },

  updateTrade: async (id: string, tradeData: Partial<Trade>): Promise<APIResponse<Trade>> => {
    const response = await api.put(`/trades/${id}`, tradeData);
    return response.data;
  },

  deleteTrade: async (id: string): Promise<APIResponse<null>> => {
    const response = await api.delete(`/trades/${id}`);
    return response.data;
  },

  uploadScreenshot: async (file: File): Promise<APIResponse<{ url: string }>> => {
    const formData = new FormData();
    formData.append('screenshot', file);
    
    const response = await api.post('/trades/upload-screenshot', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Psychology API
export const psychologyAPI = {
  getEntries: async (page: number = 1, limit: number = 10): Promise<APIResponse<PaginatedResponse<PsychologyEntry>>> => {
    const response = await api.get(`/psychology?page=${page}&limit=${limit}`);
    return response.data;
  },

  getEntry: async (id: string): Promise<APIResponse<PsychologyEntry>> => {
    const response = await api.get(`/psychology/${id}`);
    return response.data;
  },

  createEntry: async (entryData: Omit<PsychologyEntry, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<APIResponse<PsychologyEntry>> => {
    const response = await api.post('/psychology', entryData);
    return response.data;
  },

  updateEntry: async (id: string, entryData: Partial<PsychologyEntry>): Promise<APIResponse<PsychologyEntry>> => {
    const response = await api.put(`/psychology/${id}`, entryData);
    return response.data;
  },

  deleteEntry: async (id: string): Promise<APIResponse<null>> => {
    const response = await api.delete(`/psychology/${id}`);
    return response.data;
  },
};

// Analytics API
export const analyticsAPI = {
  getDashboard: async (): Promise<APIResponse<DashboardData>> => {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },

  getTradeStats: async (dateRange?: { start: Date; end: Date }): Promise<APIResponse<TradeStats>> => {
    const params = new URLSearchParams();
    if (dateRange?.start) params.append('startDate', dateRange.start.toISOString());
    if (dateRange?.end) params.append('endDate', dateRange.end.toISOString());
    
    const response = await api.get(`/analytics/stats?${params}`);
    return response.data;
  },

  getEquityCurve: async (dateRange?: { start: Date; end: Date }): Promise<APIResponse<any[]>> => {
    const params = new URLSearchParams();
    if (dateRange?.start) params.append('startDate', dateRange.start.toISOString());
    if (dateRange?.end) params.append('endDate', dateRange.end.toISOString());
    
    const response = await api.get(`/analytics/equity-curve?${params}`);
    return response.data;
  },

  getStrategyPerformance: async (dateRange?: { start: Date; end: Date }): Promise<APIResponse<any[]>> => {
    const params = new URLSearchParams();
    if (dateRange?.start) params.append('startDate', dateRange.start.toISOString());
    if (dateRange?.end) params.append('endDate', dateRange.end.toISOString());
    
    const response = await api.get(`/analytics/strategy-performance?${params}`);
    return response.data;
  },

  getEmotionAnalysis: async (dateRange?: { start: Date; end: Date }): Promise<APIResponse<any[]>> => {
    const params = new URLSearchParams();
    if (dateRange?.start) params.append('startDate', dateRange.start.toISOString());
    if (dateRange?.end) params.append('endDate', dateRange.end.toISOString());
    
    const response = await api.get(`/analytics/emotion-analysis?${params}`);
    return response.data;
  },
};

// Settings API
export const settingsAPI = {
  getSettings: async (): Promise<APIResponse<UserSettings>> => {
    const response = await api.get('/settings');
    return response.data;
  },

  updateSettings: async (settings: Partial<UserSettings>): Promise<APIResponse<UserSettings>> => {
    const response = await api.put('/settings', settings);
    return response.data;
  },

  exportData: async (format: 'json' | 'csv'): Promise<APIResponse<{ downloadUrl: string }>> => {
    const response = await api.post('/settings/export', { format });
    return response.data;
  },
};

export default api;