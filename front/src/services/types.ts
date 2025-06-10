export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'tester' | 'programmer';
  active: boolean;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  version: string;
  createdAt: string;
  testCount: number;
}

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