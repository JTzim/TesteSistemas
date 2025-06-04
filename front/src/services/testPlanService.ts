import { TestPlan } from './types';
import { mockTestPlans } from './mockData';

export const testPlanService = {
  getTestPlans: async (): Promise<TestPlan[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockTestPlans];
  },

  getTestPlanById: async (id: string): Promise<TestPlan | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTestPlans.find(testPlan => testPlan.id === id);
  },

  getTestPlansByProject: async (projectId: string): Promise<TestPlan[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTestPlans.filter(testPlan => testPlan.project === projectId);
  },

  createTestPlan: async (testPlan: Omit<TestPlan, 'id' | 'testCount' | 'progress'>): Promise<TestPlan> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newTestPlan: TestPlan = {
      ...testPlan,
      id: Math.random().toString(36).substr(2, 9),
      testCount: 0,
      progress: 0
    };
    mockTestPlans.push(newTestPlan);
    return newTestPlan;
  },

  updateTestPlan: async (id: string, updates: Partial<TestPlan>): Promise<TestPlan> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockTestPlans.findIndex(testPlan => testPlan.id === id);
    if (index === -1) throw new Error('Test plan not found');
    
    const updatedTestPlan = { ...mockTestPlans[index], ...updates };
    mockTestPlans[index] = updatedTestPlan;
    return updatedTestPlan;
  },

  deleteTestPlan: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockTestPlans.findIndex(testPlan => testPlan.id === id);
    if (index !== -1) {
      mockTestPlans.splice(index, 1);
    }
  }
};