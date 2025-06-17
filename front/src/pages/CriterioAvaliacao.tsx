import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import CriterioAvaliacaoModal from '../components/modals/CriterioAvaliacaoModal';

interface CriterioAvaliacao {
  id: number;
  avaliador: string;
  descricao: string;
  criterio: 'Eficiência' | 'Eficácia' | 'Satisfação do Usuário' | 'Aprendizado' | 'Memorabilidade' | 'Prevenção de Erros' | 'Acessibilidade' | 'Consistência e Padrões' | 'Feedback' | 'Flexibilidade' | 'Segurança no uso' | 'Usabilidade' | 'Comunicabilidade';
  fkAvaliacao: string;
  avaliadorName?: string;
  avaliacaoName?: string;
}

const CriterioAvaliacao: React.FC = () => {
  const { user, isGestor, isAvaliador } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCriterio, setEditingCriterio] = useState<CriterioAvaliacao | null>(null);
  
  const [criterios, setCriterios] = useState<CriterioAvaliacao[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<{id: string, name: string}[]>([]);

  useEffect(() => {
    const fetchCriterios = async () => {
      try {
        const response = await fetch('http://localhost:3000/mockCriteriosAvaliacao', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }

        const criterios = await response.json();
        setCriterios(criterios);
      } catch (error) {
        console.error('Erro ao buscar critérios:', error);
      }
    };

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

    fetchCriterios();
    fetchAvaliacoes();
  }, []);

  const filteredCriterios = criterios.filter(criterio => 
    criterio.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    criterio.criterio.toLowerCase().includes(searchTerm.toLowerCase()) ||
    criterio.avaliadorName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (criterio: CriterioAvaliacao | null = null) => {
    setEditingCriterio(criterio);
    setIsModalOpen(true);
  };

  const handleSaveCriterio = async (criterio: CriterioAvaliacao) => {
    try {
      if (criterio.id) {
        await fetch(`http://localhost:3000/editCriterioAvaliacao/${criterio.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(criterio)
        });
        setCriterios(criterios.map(c => c.id === criterio.id ? criterio : c));
      } else {
        const newCriterio = {
          ...criterio,
          avaliador: user?.id || ''
        };

        await fetch(`http://localhost:3000/createCriterioAvaliacao`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCriterio)
        });

        setCriterios([...criterios, newCriterio]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar Critério:', error);
    }
  };

  const handleDeleteCriterio = async (id: number) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este critério?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/deleteCriterioAvaliacao/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao excluir o critério');
      }

      setCriterios(criterios.filter(criterio => criterio.id !== id));
      alert('Critério excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir Critério:', error);
      alert('Falha ao excluir o Critério. Tente novamente.');
    }
  };

  if (!isGestor && !isAvaliador) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-2">Acesso Restrito</h2>
          <p className="text-gray-600">Apenas gestores e avaliadores podem acessar esta página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-xl font-bold text-gray-900">Critérios de Avaliação</h2>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Pesquisar Critérios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Plus size={18} className="mr-1" />
            Novo Critério
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {filteredCriterios.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Critério
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avaliador
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avaliação
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCriterios.map((criterio) => (
                  <tr key={criterio.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{criterio.criterio}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{criterio.descricao}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{criterio.avaliadorName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{criterio.avaliacaoName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleOpenModal(criterio)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteCriterio(criterio.id)}
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
            <p className="text-gray-500">Nenhum critério encontrado.</p>
          </div>
        )}
      </div>

      <CriterioAvaliacaoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCriterio}
        criterio={editingCriterio}
        avaliacoes={avaliacoes}
      />
    </div>
  );
};

export default CriterioAvaliacao; 