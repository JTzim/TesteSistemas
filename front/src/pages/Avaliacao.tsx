import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AvaliacaoModal from '../components/modals/AvaliacaoModal';

interface Avaliacao {
  id: string;
  title: string;
  media: number
  createdAt: string;
  projectId: string;
  createdBy: string;
  projectName?: string;
  createdByName?: string;
}

const Avaliacao: React.FC = () => {
  const { user, isGestor } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [projects, setProjects] = useState<{id: string, name: string}[]>([]);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const response = await fetch('http://localhost:3000/mockAvaliacoes', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }

        const avaliacoes = await response.json();
        setAvaliacoes(avaliacoes);
      } catch (error) {
        console.error('Erro ao buscar avaliações:', error);
      }
    };

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

    fetchAvaliacoes();
    fetchProjects();
  }, []);

  const filteredAvaliacoes = avaliacoes.filter(avaliacao => 
    avaliacao.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    avaliacao.createdByName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSaveAvaliacao = async (avaliacao: Avaliacao) => {
    try {
      const newAvaliacao = {
        ...avaliacao,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        createdBy: user?.id || ''
      };

      await fetch(`http://localhost:3000/createAvaliacao`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAvaliacao)
      });

      setAvaliacoes([...avaliacoes, newAvaliacao]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar Avaliação:', error);
    }
  };

  const handleDeleteAvaliacao = async (id: string) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta avaliação?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/deleteAvaliacao/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao excluir a avaliação');
      }

      setAvaliacoes(avaliacoes.filter(avaliacao => avaliacao.id !== id));
      alert('Avaliação excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir Avaliação:', error);
      alert('Falha ao excluir a Avaliação. Tente novamente.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isGestor) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-2">Acesso Restrito</h2>
          <p className="text-gray-600">Apenas gestores podem acessar esta página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-xl font-bold text-gray-900">Avaliações</h2>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Pesquisar Avaliações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleOpenModal}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Plus size={18} className="mr-1" />
            Nova Avaliação
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {filteredAvaliacoes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projeto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Criado por
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data de Criação
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Média
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAvaliacoes.map((avaliacao) => (
                  <tr key={avaliacao.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{avaliacao.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{avaliacao.projectName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{avaliacao.createdByName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(avaliacao.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{avaliacao.media}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteAvaliacao(avaliacao.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-gray-500">Nenhuma avaliação encontrada.</p>
          </div>
        )}
      </div>

      <AvaliacaoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAvaliacao}
        projects={projects}
        avaliacao={null}
      />
    </div>
  );
};

export default Avaliacao;
