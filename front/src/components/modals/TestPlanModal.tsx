import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface TestPlan {
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

interface TestPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (testPlan: TestPlan) => void;
  testPlan: TestPlan | null;
}

const TestPlanModal: React.FC<TestPlanModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  testPlan 
}) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    project: '',
    startDate: '',
    endDate: '',
    testCount: 0,
    progress: 0,
    createdBy: ''
  });

  // Mock projects for the dropdown
  const [projectOptions, setProjectOptions] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetch('http://localhost:3000/mockProjects') 
        .then((res) => res.json())
        .then((data) => {
          const projectNames = data.map((project: { name: string }) => project.name);
          setProjectOptions(projectNames);
          
          setFormData((prev) => ({
            ...prev,
            project: projectNames[0] || ''
          }));
        })
        .catch((error) => {
          console.error('Erro ao buscar projetos:', error);
        });
    }
  }, [isOpen]);
  

  // Reset form when modal opens or testPlan changes
  useEffect(() => {
    if (testPlan) {
      setFormData(testPlan);
    } else {
      const today = new Date();
      const tenDaysLater = new Date();
      tenDaysLater.setDate(today.getDate() + 10);
      
      setFormData({
        id: '',
        title: '',
        description: '',
        project: projectOptions[0],
        startDate: today.toISOString().split('T')[0],
        endDate: tenDaysLater.toISOString().split('T')[0],
        testCount: 0,
        progress: 0,
        createdBy: ''
      });
    }
  }, [testPlan, isOpen, projectOptions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;

  const parsedValue = ['testCount', 'progress'].includes(name)
    ? parseInt(value)
    : value;

  setFormData(prev => ({
    ...prev,
    [name]: parsedValue,
  }));
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                {testPlan ? 'Edit Test Plan' : 'Create New Test Plan'}
              </h3>
              <button
                type="button"
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Test Plan Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter test plan title"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-700">
                  Project
                </label>
                <select
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Select Project</option>
                  {projectOptions.map(project => (
                    <option key={project} value={project}>
                      {project}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter test plan description"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              {testPlan && (
                <div>
                  <label htmlFor="progress" className="block text-sm font-medium text-gray-700">
                    Progress ({formData.progress}%)
                  </label>
                  <input
                    type="range"
                    name="progress"
                    id="progress"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={handleChange}
                    className="mt-1 block w-full"
                  />
                </div>
              )}

              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {testPlan ? 'Update Test Plan' : 'Create Test Plan'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPlanModal;