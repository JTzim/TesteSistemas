// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'tester' | 'programmer';
  active: boolean;
  createdAt: string;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  description: string;
  version: string;
  createdAt: string;
  testCount: number;
}

// Test Case Types
export interface TestCase {
  id: string;
  title: string;
  description: string;
  steps: string[];
  expected: string;
  status: 'passed' | 'failed' | 'pending';
  project: string;
  category: string;
  createdBy: string;
  createdAt: string;
}

// Test Plan Types
export interface TestPlan {
  id: string;
  title: string;
  description: string;
  project: string;
  startDate: string;
  endDate: string;
  testCount: number;
  progress: number;
  createdBy: string;
}