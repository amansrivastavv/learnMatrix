
// src/services/api.ts

const API_BASE = 'http://localhost:8000/api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
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
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (email === 'admin@gmail.com' && password === 'admin1234') {
        return {
          user: { id: 'admin-1', name: 'Admin User', email, role: 'admin' },
          token: 'mock-admin-token'
        };
      }

      if (email === 'user@gmail.com' && password === 'user1234') {
        return {
          user: { id: 'user-1', name: 'Regular User', email, role: 'user' },
          token: 'mock-user-token'
        };
      }

      // Default for other credentials (treated as user)
      return {
        user: { id: '1', name: 'Demo User', email, role: 'user' },
        token: 'mock-jwt-token'
      };
    },
    register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        user: { id: '1', name, email, role: 'user' },
        token: 'mock-jwt-token'
      };
    },
    logout: async () => {
      localStorage.removeItem('token');
    }
  },
  dashboard: {
    getStats: async () => {
      // Return mock stats immediately
      return {
        streak: 12,
        totalHours: 48.5,
        questionsSolved: 142,
        topicsCovered: 8
      };
    },
    getRecentActivity: async () => {
      return [
        { id: 1, type: 'practice', title: 'Solved "Two Sum"', date: new Date().toISOString() },
        { id: 2, type: 'daily', title: 'Learned React Hooks', date: new Date(Date.now() - 86400000).toISOString() },
        { id: 3, type: 'resource', title: 'Added "Next.js Docs"', date: new Date(Date.now() - 172800000).toISOString() },
      ];
    }
  },
  daily: {
    create: async (data: any) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { id: Math.random().toString(), ...data };
    },
    list: async () => {
      return [];
    }
  },
  practice: {
    list: async () => {
      return [
        { id: '1', title: 'Two Sum', difficulty: 'Easy', status: 'Solved', topic: 'Array' },
        { id: '2', title: 'Reverse Linked List', difficulty: 'Medium', status: 'Pending', topic: 'LinkedList' },
      ];
    },
    add: async (data: any) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { id: Math.random().toString(), ...data };
    },
    toggleStatus: async (id: string) => {
      return { success: true };
    }
  },
  progress: {
    getData: async () => {
      return {
        studyHours: [2, 4.5, 3, 6, 4, 5.5, 3],
        topicsDistribution: { 
          'Frontend': 40, 
          'Backend': 30, 
          'DSA': 20, 
          'DevOps': 10 
        }
      };
    }
  },
  ai: {
    generateRoadmap: async (field: string, duration: number, dailyTime: number) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        roadmap: [
          { week: 1, topic: "Basics", description: "Learn the fundamentals." },
          { week: 2, topic: "Advanced", description: "Deep dive into complex topics." }
        ]
      };
    }
  }
};
