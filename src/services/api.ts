
// src/services/api.ts

const API_BASE = 'http://localhost:8000/api';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
};

export const api = {
  auth: {
    login: async (email: string, password: string): Promise<AuthResponse> => {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return handleResponse(response);
    },
    register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      return handleResponse(response);
    },
    logout: async () => {
      localStorage.removeItem('token');
    }
  },
  dashboard: {
    getStats: async () => {
      const response = await fetch(`${API_BASE}/stats`, { headers: getHeaders() });
      return handleResponse(response);
    },
    getRecentActivity: async () => {
      // Mocking this for now as backend might not have this exact endpoint ready or populated
      return [
        { id: 1, type: 'practice', title: 'Solved "Two Sum"', date: new Date().toISOString() },
      ];
    }
  },
  daily: {
    create: async (data: any) => {
      const response = await fetch(`${API_BASE}/daily`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
    list: async () => {
      const response = await fetch(`${API_BASE}/daily`, { headers: getHeaders() });
      return handleResponse(response);
    }
  },
  practice: {
    list: async () => {
      const response = await fetch(`${API_BASE}/practice`, { headers: getHeaders() });
      return handleResponse(response);
    },
    add: async (data: any) => {
      const response = await fetch(`${API_BASE}/practice`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
    toggleStatus: async (id: string) => {
      const response = await fetch(`${API_BASE}/practice/${id}/toggle`, {
        method: 'POST',
        headers: getHeaders(),
      });
      return handleResponse(response);
    }
  },
  progress: {
    getData: async () => {
      // Using stats endpoint for now as it contains similar data, or mock if specific structure needed
      // The backend stats endpoint returns streak, monthlySummary, graphData
      const response = await fetch(`${API_BASE}/stats`, { headers: getHeaders() });
      const data = await handleResponse(response);
      
      // Transform backend data to match frontend expectation if needed
      return {
        studyHours: data.graphData || [0, 0, 0, 0, 0, 0, 0],
        topicsDistribution: { 'General': 100 } // Placeholder until backend supports this
      };
    }
  },
  ai: {
    generateRoadmap: async (field: string, duration: number, dailyTime: number) => {
      const response = await fetch(`${API_BASE}/ai/roadmap`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ field, duration, dailyTime }),
      });
      return handleResponse(response);
    }
  }
};
