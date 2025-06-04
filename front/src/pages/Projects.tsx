import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash, Eye } from 'lucide-react';
import ProjectModal from '../components/modals/ProjectModal';
import { useAuth } from '../contexts/AuthContext';

interface Project {
  id: string;
  name: string;
  description: string;
  version: string;
  createdAt: string;
  testCount: number;
}

const Projects: React.FC = () => {
  const { isAdmin } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Mock data
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3000/mockProjects', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const projects = await response.json();
      setProjects(projects); 
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  };
  fetchProjects();
}, []);


  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (project: Project | null = null) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleSaveProject = async (project: Project) => {
    try {
      if (project.id) {
        await fetch(`http://localhost:3000/editProject/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
        setProjects(projects.map(p => p.id === project.id ? project : p));
    } else {
      const newProject = {
        ...project,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        testCount: 0
      };

      await fetch(`http://localhost:3000/createProject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });

      setProjects([...projects, newProject]);
    }
    setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar Projeto:', error);
    }
    
  };

  const handleDeleteProject = async(id: string) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este projeto?");
    if (!confirmDelete) return;

    try {
    const response = await fetch(`http://localhost:3000/deleteProject/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao excluir o projeto');
    }

    setProjects(projects.filter(project => project.id !== id));
    alert('Projeto excluído com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir Projeto:', error);
    alert('Falha ao excluir o Projeto. Tente novamente.');
  }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-xl font-bold text-gray-900">Projects</h2>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {isAdmin && (
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <Plus size={18} className="mr-1" />
              New Project
            </button>
          )}
        </div>
      </div>

      {/* Projects list */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {filteredProjects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projeto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Versão
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data de Criação
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Testes
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{project.name}</div>
                          <div className="text-sm text-gray-500">{project.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{project.version}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(project.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.testCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye size={18} />
                        </button>
                        {isAdmin && (
                          <>
                            <button 
                              onClick={() => handleOpenModal(project)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => handleDeleteProject(project.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-gray-500">Nenhum projeto encontrado correspondente à sua busca.</p>
          </div>
        )}
      </div>

      <ProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        project={editingProject}
      />
    </div>
  );
};

export default Projects;