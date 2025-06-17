import React, { useState } from 'react';
import { Calendar, FileText, Download, Printer, Users, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  version: string;
  testCount: number;
  createdAt: string;
  createdBy: string;
  passedTests: number;
  failedTests: number;
  pendingTests: number;
  testPlans: number;
}

interface TestPlan {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  testCount: number;
  progress: number;
  createdBy: string;
  project: string;
  status: 'em_andamento' | 'concluido' | 'atrasado';
  passedTests: number;
  failedTests: number;
  pendingTests: number;
}

interface TestCase {
  id: string;
  title: string;
  description: string;
  expected: string;
  status: 'pending' | 'passed' | 'failed';
  category: string;
  createdBy: string;
  createdAt: string;
}

const Reports: React.FC = () => {
  const [project, setProject] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const projectOptions = [
    { value: 'all', label: 'Todos os Projetos' },
    { value: 'Gerenciamento de Teste', label: 'Gerenciamento de Teste' },
    { value: 'Sistema de Pagamentos', label: 'Sistema de Pagamentos' },
    { value: 'Portal de Atendimento', label: 'Portal de Atendimento' }
  ];

  // Dados mockados para exemplo
  const mockProjects: Project[] = [
    {
      id: '1',
      name: 'Gerenciamento de Teste',
      description: 'Sistema de gerenciamento de testes automatizados',
      version: '1.0.0',
      testCount: 45,
      createdAt: '2025-01-15',
      createdBy: 'João Silva',
      passedTests: 30,
      failedTests: 10,
      pendingTests: 5,
      testPlans: 3
    },
    {
      id: '2',
      name: 'Sistema de Pagamentos',
      description: 'Sistema de processamento de pagamentos',
      version: '2.1.0',
      testCount: 32,
      createdAt: '2025-02-01',
      createdBy: 'Maria Santos',
      passedTests: 25,
      failedTests: 4,
      pendingTests: 3,
      testPlans: 2
    }
  ];

  const mockTestPlans: TestPlan[] = [
    {
      id: '1',
      title: 'Plano de Testes - Sprint 1',
      description: 'Testes de funcionalidades básicas',
      startDate: '2025-03-01',
      endDate: '2025-03-15',
      testCount: 20,
      progress: 75,
      createdBy: 'Ana Costa',
      project: 'Gerenciamento de Teste',
      status: 'em_andamento',
      passedTests: 15,
      failedTests: 3,
      pendingTests: 2
    },
    {
      id: '2',
      title: 'Plano de Testes - Sprint 2',
      description: 'Testes de integração',
      startDate: '2025-03-16',
      endDate: '2025-03-30',
      testCount: 15,
      progress: 40,
      createdBy: 'Pedro Oliveira',
      project: 'Sistema de Pagamentos',
      status: 'atrasado',
      passedTests: 6,
      failedTests: 4,
      pendingTests: 5
    }
  ];

  const mockTestCases: TestCase[] = [
    {
      id: '1',
      title: 'Login de Usuário',
      description: 'Verificar processo de login',
      expected: 'Usuário deve conseguir fazer login',
      status: 'passed',
      category: 'Autenticação',
      createdBy: 'Carlos Souza',
      createdAt: '2025-03-10'
    },
    {
      id: '2',
      title: 'Cadastro de Projeto',
      description: 'Testar cadastro de novo projeto',
      expected: 'Projeto deve ser criado com sucesso',
      status: 'failed',
      category: 'Cadastro',
      createdBy: 'Mariana Lima',
      createdAt: '2025-03-12'
    }
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
    }, 1500);
  };

  const handleDownload = () => {
    // Implementar lógica de download
  };

  const renderProjectsReport = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900 mb-3">Projetos</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Versão</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Criado por</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data Criação</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Planos de Teste</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total de Testes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status dos Testes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockProjects.map(project => (
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.version}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.createdBy}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.testPlans}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.testCount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {project.passedTests}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      <XCircle className="w-3 h-3 mr-1" />
                      {project.failedTests}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Clock className="w-3 h-3 mr-1" />
                      {project.pendingTests}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTestPlansReport = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900 mb-3">Planos de Teste</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Projeto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Criado por</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data Início</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data Fim</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progresso</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resultados</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockTestPlans.map(plan => (
              <tr key={plan.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plan.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.project}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.createdBy}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plan.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    plan.status === 'em_andamento' ? 'bg-blue-100 text-blue-800' :
                    plan.status === 'concluido' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {plan.status === 'em_andamento' ? 'Em Andamento' :
                     plan.status === 'concluido' ? 'Concluído' : 'Atrasado'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        plan.status === 'atrasado' ? 'bg-red-600' :
                        plan.progress === 100 ? 'bg-green-600' : 'bg-blue-600'
                      }`}
                      style={{ width: `${plan.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 mt-1">{plan.progress}%</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {plan.passedTests}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      <XCircle className="w-3 h-3 mr-1" />
                      {plan.failedTests}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Clock className="w-3 h-3 mr-1" />
                      {plan.pendingTests}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTestCasesReport = () => (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900 mb-3">Casos de Teste</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Criado por</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockTestCases.map(testCase => (
              <tr key={testCase.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{testCase.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{testCase.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{testCase.createdBy}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{testCase.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    testCase.status === 'passed' ? 'bg-green-100 text-green-800' :
                    testCase.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {testCase.status === 'passed' && <CheckCircle className="w-4 h-4 mr-1" />}
                    {testCase.status === 'failed' && <XCircle className="w-4 h-4 mr-1" />}
                    {testCase.status === 'pending' && <Clock className="w-4 h-4 mr-1" />}
                    {testCase.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSummary = () => {
    const totalProjects = mockProjects.length;
    const totalTestPlans = mockTestPlans.length;
    const totalTestCases = mockTestCases.length;
    
    const totalPassedTests = mockProjects.reduce((sum, project) => sum + project.passedTests, 0);
    const totalFailedTests = mockProjects.reduce((sum, project) => sum + project.failedTests, 0);
    const totalPendingTests = mockProjects.reduce((sum, project) => sum + project.pendingTests, 0);
    
    const testPlansEmAndamento = mockTestPlans.filter(plan => plan.status === 'em_andamento').length;
    const testPlansConcluidos = mockTestPlans.filter(plan => plan.status === 'concluido').length;
    const testPlansAtrasados = mockTestPlans.filter(plan => plan.status === 'atrasado').length;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <h3 className="ml-3 text-xl font-medium text-gray-900">Projetos</h3>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-semibold text-gray-900">{totalProjects}</p>
              <p className="text-sm text-gray-500">Total de projetos ativos</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-500" />
              <h3 className="ml-3 text-xl font-medium text-gray-900">Planos de Teste</h3>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-semibold text-gray-900">{totalTestPlans}</p>
              <div className="flex space-x-2 mt-1">
                <span className="text-xs text-blue-600">{testPlansEmAndamento} em andamento</span>
                <span className="text-xs text-green-600">{testPlansConcluidos} concluídos</span>
                <span className="text-xs text-red-600">{testPlansAtrasados} atrasados</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-purple-500" />
              <h3 className="ml-3 text-xl font-medium text-gray-900">Casos de Teste</h3>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-semibold text-gray-900">{totalTestCases}</p>
              <p className="text-sm text-gray-500">Total de casos de teste</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Status dos Testes</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Aprovados</span>
                  <span className="text-sm font-medium text-green-600">{totalPassedTests}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(totalPassedTests / (totalPassedTests + totalFailedTests + totalPendingTests)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Falhas</span>
                  <span className="text-sm font-medium text-red-600">{totalFailedTests}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${(totalFailedTests / (totalPassedTests + totalFailedTests + totalPendingTests)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Pendentes</span>
                  <span className="text-sm font-medium text-yellow-600">{totalPendingTests}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: `${(totalPendingTests / (totalPassedTests + totalFailedTests + totalPendingTests)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Progresso dos Planos de Teste</h3>
            <div className="space-y-4">
              {mockTestPlans.map(plan => (
                <div key={plan.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{plan.title}</span>
                    <span className={`text-sm font-medium ${
                      plan.status === 'atrasado' ? 'text-red-600' :
                      plan.progress === 100 ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {plan.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        plan.status === 'atrasado' ? 'bg-red-600' :
                        plan.progress === 100 ? 'bg-green-600' : 'bg-blue-600'
                      }`}
                      style={{ width: `${plan.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Gerar Relatório</h3>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div>
            <label htmlFor="project" className="block text-sm font-medium text-gray-700">
              Projeto
            </label>
            <select
              id="project"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {projectOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                isGenerating ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              <FileText className="mr-2 h-4 w-4" />
              {isGenerating ? 'Gerando...' : 'Gerar Relatório'}
            </button>
          </div>
        </div>
      </div>

      {reportGenerated && (
        <div className="bg-white shadow rounded-lg overflow-hidden animate-fadeIn">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Relatório de Testes - {project === 'all' ? 'Todos os Projetos' : project} - {new Date().toLocaleDateString()}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none"
              >
                <Download className="mr-1 h-4 w-4" />
                Baixar PDF
              </button>
              <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none">
                <Printer className="mr-1 h-4 w-4" />
                Imprimir
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {renderSummary()}
            {renderProjectsReport()}
            {renderTestPlansReport()}
            {renderTestCasesReport()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
