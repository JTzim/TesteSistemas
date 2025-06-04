import { User } from './types';
import { mockUsers } from './mockData';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockUsers];
  },

  getUserById: async (id: string): Promise<User | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUsers.find(user => user.id === id);
  },

  createUser: async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return newUser;
  },

  updateUser: async (id: string, updates: Partial<User>): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockUsers.findIndex(user => user.id === id);
    if (index === -1) throw new Error('User not found');
    
    const updatedUser = { ...mockUsers[index], ...updates };
    mockUsers[index] = updatedUser;
    return updatedUser;
  },

  deleteUser: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      mockUsers.splice(index, 1);
    }
  },

  authenticate: async (email: string, password: string): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password') {
      return user;
    }
    return null;
  }
};