import { TestCase } from './types';
import { mockTestCases } from './mockData';

export const testCaseService = {
  getTestCases: async (): Promise<TestCase[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockTestCases];
  },

  getTestCaseById: async (id: string): Promise<TestCase | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTestCases.find(testCase => testCase.id === id);
  },

  getTestCasesByProject: async (projectId: string): Promise<TestCase[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTestCases.filter(testCase => testCase.project === projectId);
  },

  createTestCase: async (testCase: Omit<TestCase, 'id' | 'createdAt'>): Promise<TestCase> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newTestCase: TestCase = {
      ...testCase,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    mockTestCases.push(newTestCase);
    return newTestCase;
  },

  updateTestCase: async (id: string, updates: Partial<TestCase>): Promise<TestCase> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockTestCases.findIndex(testCase => testCase.id === id);
    if (index === -1) throw new Error('Test case not found');
    
    const updatedTestCase = { ...mockTestCases[index], ...updates };
    mockTestCases[index] = updatedTestCase;
    return updatedTestCase;
  },

  deleteTestCase: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockTestCases.findIndex(testCase => testCase.id === id);
    if (index !== -1) {
      mockTestCases.splice(index, 1);
    }
  }
};