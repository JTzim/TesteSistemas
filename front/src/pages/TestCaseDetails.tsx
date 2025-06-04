import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { TestCase, testCaseService } from '../services';
import { Calendar, CheckCircle2, XCircle, Clock, MessageSquare, History } from 'lucide-react';
import toast from 'react-hot-toast';

interface TestHistory {
  id: string;
  testCaseId: string;
  status: 'passed' | 'failed' | 'pending';
  executedBy: string;
  executedAt: string;
  notes: string;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

const TestCaseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [testCase, setTestCase] = useState<TestCase | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');

  // Mock history data
  const [history] = useState<TestHistory[]>([
    {
      id: '1',
      testCaseId: '1',
      status: 'failed',
      executedBy: 'Luana Martins',
      executedAt: '2025-03-18T14:30:00Z',
      notes: 'Found issues with input validation'
    },
    {
      id: '2',
      testCaseId: '1',
      status: 'passed',
      executedBy: 'Luana Martins',
      executedAt: '2025-03-19T10:15:00Z',
      notes: 'All validation issues resolved'
    }
  ]);

  // Mock comments data
  const [comments] = useState<Comment[]>([
    {
      id: '1',
      userId: '2',
      userName: 'Luana Martins',
      content: 'Updated test steps to include edge cases',
      createdAt: '2025-03-19T14:30:00Z'
    },
    {
      id: '2',
      userId: '3',
      userName: 'Beto Silva',
      content: 'Implemented fixes for the reported issues',
      createdAt: '2025-03-19T15:45:00Z'
    }
  ]);

  useEffect(() => {
    const fetchTestCase = async () => {
      try {
        if (id) {
          const data = await testCaseService.getTestCaseById(id);
          if (data) {
            setTestCase(data);
          }
        }
      } catch (error) {
        toast.error('Failed to load test case details');
      } finally {
        setLoading(false);
      }
    };

    fetchTestCase();
  }, [id]);

  const handleStatusUpdate = async (status: 'passed' | 'failed' | 'pending') => {
    try {
      if (testCase && testCase.id) {
        const updatedTestCase = await testCaseService.updateTestCase(testCase.id, {
          ...testCase,
          status
        });
        setTestCase(updatedTestCase);
        toast.success('Status updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    // In a real app, this would be an API call
    const comment: Comment = {
      id: Math.random().toString(),
      userId: user?.id || '',
      userName: user?.name || '',
      content: newComment,
      createdAt: new Date().toISOString()
    };

    // Update comments state
    comments.push(comment);
    setNewComment('');
    toast.success('Comment added successfully');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!testCase) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Caso de Teste não encontrado</h2>
        <button
          onClick={() => navigate('/test-cases')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Voltar para Casos de Teste
        </button>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 size={20} className="text-green-500" />;
      case 'failed':
        return <XCircle size={20} className="text-red-500" />;
      default:
        return <Clock size={20} className="text-amber-500" />;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-amber-100 text-amber-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{testCase.title}</h1>
            <p className="mt-1 text-gray-600">{testCase.description}</p>
            <div className="mt-4 flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1 text-gray-500" />
                <span className="text-gray-600">Criado {formatDate(testCase.createdAt)}</span>
              </div>
              <div className="text-gray-600">por {testCase.createdBy}</div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(testCase.status)}`}>
                {testCase.status.charAt(0).toUpperCase() + testCase.status.slice(1)}
              </div>
            </div>
          </div>

          {user?.role === 'tester' && (
            <div className="flex space-x-2">
              <button
                onClick={() => handleStatusUpdate('passed')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Marcar Aprovado
              </button>
              <button
                onClick={() => handleStatusUpdate('failed')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Marcar Reprovado
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Test Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Test Steps and Expected Results */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Detalhes do Teste</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-700">Passos:</h3>
                <ol className="mt-2 space-y-2">
                  {testCase.steps.map((step, index) => (
                    <li key={index} className="flex">
                      <span className="flex-shrink-0 w-6 text-gray-500">{index + 1}.</span>
                      <span className="text-gray-600">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="font-medium text-gray-700">Resultado Esperado:</h3>
                <p className="mt-2 text-gray-600">{testCase.expected}</p>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
              <MessageSquare size={20} className="mr-2" />
              Comentários
            </h2>

            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-gray-900">{comment.userName}</span>
                    <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="mt-1 text-gray-600">{comment.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
              <button
                onClick={handleAddComment}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Adicionar Comentário
              </button>
            </div>
          </div>
        </div>

        {/* Test History */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
            <History size={20} className="mr-2" />
            Histórico do Teste
          </h2>

          <div className="space-y-4">
            {history.map(entry => (
              <div key={entry.id} className="border-l-4 border-gray-200 pl-4">
                <div className="flex items-start">
                  {getStatusIcon(entry.status)}
                  <div className="ml-3">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">{entry.executedBy}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{formatDate(entry.executedAt)}</span>
                    </div>
                    <p className="mt-1 text-gray-600">{entry.notes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCaseDetails;