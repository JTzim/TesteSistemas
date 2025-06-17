import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Avaliacao {
  id: string;
  title: string;
  media:number
  createdAt: string;
  projectId: string;
  createdBy: string;
}

interface AvaliacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (avaliacao: Avaliacao) => void;
  avaliacao: Avaliacao | null;
  projects: {id: string, name: string}[];
}

const AvaliacaoModal: React.FC<AvaliacaoModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  avaliacao,
  projects 
}) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    projectId: '',
    media: 0,
    createdAt: '',
    createdBy: ''
  });

  useEffect(() => {
    if (avaliacao) {
      setFormData({
        ...avaliacao
      });
    } else {
      setFormData({
        id: '',
        title: '',
        projectId: projects[0]?.id || '',
        media: 0,
        createdAt: '',
        createdBy: ''
      });
    }
  }, [avaliacao, isOpen, projects]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const selectedProject = projects.find(p => p.id === value);
    setFormData({ 
      ...formData, 
      [name]: value,
      title: selectedProject ? `Ava - ${selectedProject.name}` : ''
    });
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
                {avaliacao ? 'Editar Avaliação' : 'Nova Avaliação'}
              </h3>
              <button
                type="button"
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <span className="sr-only">Fechar</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="projectId" className="block text-sm font-medium text-gray-700">
                  Projeto
                </label>
                <select
                  id="projectId"
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Selecione um Projeto</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  readOnly
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                />
              </div>

              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {avaliacao ? 'Atualizar Avaliação' : 'Criar Avaliação'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvaliacaoModal; 
