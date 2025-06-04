import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash, Eye, CheckCircle2, XCircle, Clock } from 'lucide-react';
import TestCaseModal from '../components/modals/TestCaseModal';
import { useAuth } from '../contexts/AuthContext';

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

const TestCases: React.FC = () => {
  const { user, isAdmin, isTester } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingTestCase, setEditingTestCase] = useState<TestCase | null>(null);

  // Mock data
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  useEffect(() => {
    const fetchTestCases = async () => {
      try {
        const response = await fetch('http://localhost:3000/mockTestCase', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
  
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
  
        const testCases = await response.json();
        setTestCases(testCases); 
      } catch (error) {
        console.error('Erro ao buscar os casos de teste:', error);
      }
    };
    fetchTestCases();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 size={18} className="text-green-500" />;
      case 'failed':
        return <XCircle size={18} className="text-red-500" />;
      case 'pending':
        return <Clock size={18} className="text-amber-500" />;
      default:
        return null;
    }
  };

  const filteredTestCases = testCases.filter(testCase => {
    const matchesSearch = 
      testCase.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      testCase.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || testCase.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleOpenModal = (testCase: TestCase | null = null) => {
    setEditingTestCase(testCase);
    setIsModalOpen(true);
  };

  const handleSaveTestCase = async (testCase: TestCase) => {
  try {
    if (testCase.id) {
      await fetch(`http://localhost:3000/editTestCase/${testCase.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testCase),
      });

      setTestCases(testCases.map(tc => tc.id === testCase.id ? testCase : tc));
    } else {
      
      const newTestCase = {
        ...testCase,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        createdBy: user?.name || 'Unknown User',
        status: 'pending' as const,
      };

      await fetch(`http://localhost:3000/createTestCase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTestCase),
      });

      setTestCases([...testCases, newTestCase]);
    }

    setIsModalOpen(false);
  } catch (error) {
    console.error('Erro ao salvar Caso de Teste:', error);
  }
};

  const handleDeleteTestCase = async (id: string) => {
  const confirmDelete = window.confirm("Tem certeza que deseja excluir este caso de teste?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:3000/deleteTestCase/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao excluir o caso de teste');
    }

    setTestCases(testCases.filter(testCase => testCase.id !== id));
    alert('Caso de teste excluído com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir caso de teste:', error);
    alert('Falha ao excluir o caso de teste. Tente novamente.');
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
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
        <h2 className="text-xl font-bold text-gray-900">Test Cases</h2>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search test cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative inline-block">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Status</option>
              <option value="passed">Aprovado</option>
              <option value="failed">Falhou</option>
              <option value="pending">Pendente</option>
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          {(isAdmin || isTester) && (
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <Plus size={18} className="mr-1" />
              New Test Case
            </button>
          )}
        </div>
      </div>

      {/* Test cases list */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {filteredTestCases.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Caso de Teste
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projeto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Criado
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTestCases.map((testCase) => (
                  <tr key={testCase.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{testCase.title}</div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">{testCase.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{testCase.project}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{testCase.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(testCase.status)}
                        <span className="ml-1 text-sm capitalize">
                          {testCase.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(testCase.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye size={18} />
                        </button>
                        {(isAdmin || isTester) && (
                          <>
                            <button
                              onClick={() => handleOpenModal(testCase)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteTestCase(testCase.id)}
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
            <p className="text-gray-500">Nenhum caso de teste encontrado com essa busca.</p>
          </div>
        )}
      </div>

      <TestCaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTestCase}
        testCase={editingTestCase}
      />
    </div>
  );
};

export default TestCases;