import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface TestCase {
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

interface TestCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (testCase: TestCase) => void;
  testCase: TestCase | null;
}

const TestCaseModal: React.FC<TestCaseModalProps> = ({ isOpen, onClose, onSave, testCase }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    steps: [''],
    expected: '',
    status: 'pending' as const,
    project: '',
    category: '',
    createdBy: '',
    createdAt: ''
  });

  // Mock projects and categories for the dropdown
  const [projectOptions, setProjectOptions] = useState<string[]>([]);
  const categoryOptions = ['Cadastro', 'Validação', 'Autenticação', 'Relatórios', 'Integração'];

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


  // Reset form when modal opens or testCase changes
  useEffect(() => {
    if (testCase) {
      setFormData({
        ...testCase,
        // Make sure steps is always an array
        steps: Array.isArray(testCase.steps) ? testCase.steps : ['']
      });
    } else {
      setFormData({
        id: '',
        title: '',
        description: '',
        steps: [''],
        expected: '',
        status: 'pending',
        project: projectOptions[0],
        category: '',
        createdBy: '',
        createdAt: ''
      });
    }
  }, [testCase, isOpen, projectOptions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStepChange = (index: number, value: string) => {
    const updatedSteps = [...formData.steps];
    updatedSteps[index] = value;
    setFormData({ ...formData, steps: updatedSteps });
  };

  const addStep = () => {
    setFormData({ ...formData, steps: [...formData.steps, ''] });
  };

  const removeStep = (index: number) => {
    if (formData.steps.length > 1) {
      const updatedSteps = formData.steps.filter((_, i) => i !== index);
      setFormData({ ...formData, steps: updatedSteps });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out any empty steps before saving
    const cleanedSteps = formData.steps.filter(step => step.trim() !== '');
    onSave({
      ...formData,
      steps: cleanedSteps.length > 0 ? cleanedSteps : ['']
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                {testCase ? 'Edit Test Case' : 'Add New Test Case'}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Test Case Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter test case title"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
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
                  rows={2}
                  placeholder="Enter test case description"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Test Steps
                  </label>
                  <button
                    type="button"
                    onClick={addStep}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Step
                  </button>
                </div>
                <div className="mt-2 space-y-3">
                  {formData.steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <span className="mr-2 text-gray-500">{index + 1}.</span>
                      <input
                        type="text"
                        value={step}
                        onChange={(e) => handleStepChange(index, e.target.value)}
                        placeholder={`Step ${index + 1}`}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="ml-2 text-gray-400 hover:text-red-500"
                        disabled={formData.steps.length <= 1}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="expected" className="block text-sm font-medium text-gray-700">
                  Expected Result
                </label>
                <textarea
                  name="expected"
                  id="expected"
                  value={formData.expected}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Enter expected result"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {testCase && (
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="pending">Pending</option>
                    <option value="passed">Passed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              )}

              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {testCase ? 'Update Test Case' : 'Create Test Case'}
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

export default TestCaseModal;