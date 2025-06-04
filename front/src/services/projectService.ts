import { Project } from './types';
import { mockProjects } from './mockData';

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockProjects];
  },

  getProjectById: async (id: string): Promise<Project | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProjects.find(project => project.id === id);
  },

  createProject: async (project: Omit<Project, 'id' | 'createdAt' | 'testCount'>): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newProject: Project = {
      ...project,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      testCount: 0
    };
    mockProjects.push(newProject);
    return newProject;
  },

  updateProject: async (id: string, updates: Partial<Project>): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockProjects.findIndex(project => project.id === id);
    if (index === -1) throw new Error('Project not found');
    
    const updatedProject = { ...mockProjects[index], ...updates };
    mockProjects[index] = updatedProject;
    return updatedProject;
  },

  deleteProject: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockProjects.findIndex(project => project.id === id);
    if (index !== -1) {
      mockProjects.splice(index, 1);
    }
  }
};