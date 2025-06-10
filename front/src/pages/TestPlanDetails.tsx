import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { TestPlan, TestCase, testPlanService, testCaseService } from '../services';
import { Calendar, Clock, CheckCircle2, XCircle, MessageSquare, Plus } from 'lucide-react';
import TestCaseModal from '../components/modals/TestCaseModal';
import toast from 'react-hot-toast';

interface Comment {
  id: string;
  testCaseId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

const TestPlanDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [testPlan, setTestPlan] = useState<TestPlan | null>(null);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [comments] = useState<Comment[]>([
    {
      id: '1',
      testCaseId: '1',
      userId: '2',
      userName: 'Luana Martins',
      content: 'Found an edge case where the validation fails with special characters.',
      createdAt: '2025-03-19T14:30:00Z'
    },
    {
      id: '2',
      testCaseId: '1',
      userId: '3',
      userName: 'Beto Silva',
      content: 'Fixed the validation issue. Please verify.',
      createdAt: '2025-03-19T15:45:00Z'
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const [planData, casesData] = await Promise.all([
            testPlanService.getTestPlanById(id),
            testCaseService.getTestCases()
          ]);
          
          if (planData) {
            setTestPlan(planData);
            setTestCases(casesData.filter(tc => tc.project === planData.project));
          }
        }
      } catch (error) {
        toast.error('Failed to load test plan details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSaveTestCase = async (testCase: TestCase) => {
    try {
      if (testCase.id) {
        await testCaseService.updateTestCase(testCase.id, testCase);
        setTestCases(prev => prev.map(tc => tc.id === testCase.id ? testCase : tc));
      } else {
        const newTestCase = await testCaseService.createTestCase(testCase);
        setTestCases(prev => [...prev, newTestCase]);
      }
      setIsModalOpen(false);
      toast.success('Test case saved successfully');
    } catch (error) {
      toast.error('Failed to save test case');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!testPlan) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Plano de Teste não encontrado</h2>
        <button
          onClick={() => navigate('/test-plans')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Voltar para os Planos de Teste
        </button>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 size={18} className="text-green-500" />;
      case 'failed':
        return <XCircle size={18} className="text-red-500" />;
      default:
        return <Clock size={18} className="text-amber-500" />;
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
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{testPlan.title}</h1>
            <p className="mt-1 text-gray-600">{testPlan.description}</p>
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>{testPlan.startDate} to {testPlan.endDate}</span>
              </div>
              <div>Criado por {testPlan.createdBy}</div>
            </div>
          </div>
          
          {user?.role === 'programmer' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={18} className="mr-1" />
              Adicionar Caso de Teste
            </button>
          )}
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progresso</span>
            <span>{testPlan.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                testPlan.progress >= 90 ? 'bg-green-500' :
                testPlan.progress >= 60 ? 'bg-teal-500' :
                testPlan.progress >= 30 ? 'bg-amber-500' :
                'bg-red-500'
              }`}
              style={{ width: `${testPlan.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Casos de Teste</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {testCases.map((testCase) => (
            <div key={testCase.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(testCase.status)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{testCase.title}</h3>
                    <p className="mt-1 text-gray-600">{testCase.description}</p>
                    
                    <div className="mt-4 space-y-2">
                      <div>
                        <h4 className="font-medium text-gray-700">Passos:</h4>
                        <ol className="mt-1 list-decimal list-inside text-gray-600">
                          {testCase.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700">Resultado Esperado:</h4>
                        <p className="text-gray-600">{testCase.expected}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-700 flex items-center">
                        <MessageSquare size={16} className="mr-1" />
                        Comentários
                      </h4>
                      <div className="mt-2 space-y-4">
                        {comments
                          .filter(comment => comment.testCaseId === testCase.id)
                          .map(comment => (
                            <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                              <div className="flex justify-between items-start">
                                <span className="font-medium text-gray-900">{comment.userName}</span>
                                <span className="text-sm text-gray-500">
                                  {formatDate(comment.createdAt)}
                                </span>
                              </div>
                              <p className="mt-1 text-gray-600">{comment.content}</p>
                            </div>
                          ))}
                      </div>
                      
                      <div className="mt-3">
                        <textarea
                          placeholder="Add a comment..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={2}
                        />
                        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          Adicionar Comentário
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TestCaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTestCase}
        testCase={null}
      />
    </div>
  );
};

export default TestPlanDetails;