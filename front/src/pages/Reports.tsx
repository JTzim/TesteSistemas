import React, { useState } from 'react';
import { Calendar, FileText, Download, Printer } from 'lucide-react';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('test-results');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [project, setProject] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const projectOptions = [
    { value: 'all', label: 'Todos os Projetos' },
    { value: 'Gerenciamento de Teste', label: 'Gerenciamento de Teste' },
    { value: 'Sistema de Pagamentos', label: 'Sistema de Pagamentos' },
    { value: 'Portal de Atendimento', label: 'Portal de Atendimento' }
  ];

  const reportTypes = [
    { value: 'test-results', label: 'Resumo dos resultados do teste' },
    { value: 'defects', label: 'Relatorio de Defeitos' },
    { value: 'progress', label: 'Relatorio do Progresso de Teste' },
    { value: 'coverage', label: 'Reportar Teste de Cobertura' }
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
    }, 1500);
  };

  const handleDownload = () => {
    // In a real app, this would trigger a file download
    alert('Report downloaded');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Gerar Relatório</h3>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reportType" className="block text-sm font-medium text-gray-700">
                Tipo de Relatório
              </label>
              <select
                id="reportType"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {reportTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Data Início
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                Data Final
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
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
              {isGenerating ? 'Generating...' : 'Generate Report'}
            </button>
          </div>
        </div>
      </div>

      {reportGenerated && (
        <div className="bg-white shadow rounded-lg overflow-hidden animate-fadeIn">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              {reportTypes.find(r => r.value === reportType)?.label} - {new Date().toLocaleDateString()}
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
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
              <div>
                <h4 className="text-lg font-bold">Relatório do TestFlow</h4>
                <p className="text-sm text-gray-600">
                  {project === 'all' ? 'All Projects' : project}
                  {startDate && endDate ? ` • ${startDate} to ${endDate}` : ''}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Gerado por: {}</p>
                <p className="text-sm text-gray-600">{new Date().toLocaleString()}</p>
              </div>
            </div>

            <div className="py-4">
              <h4 className="font-medium text-gray-900 mb-3">Resumo</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total de Testes</p>
                    <p className="text-2xl font-semibold">248</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Aprovados</p>
                    <p className="text-2xl font-semibold text-green-600">178</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Falhas</p>
                    <p className="text-2xl font-semibold text-red-600">23</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pendentes</p>
                    <p className="text-2xl font-semibold text-amber-600">47</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-4">
              <h4 className="font-medium text-gray-900 mb-3">Resultado dos Testes por Categoria</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total de Testes
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aprovados
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Falhas
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pendentes
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Taxa de Aprovação
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cadastro</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">56</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">48</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">5</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-600">3</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">85.7%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Validação</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">42</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">38</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">2</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-600">2</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">90.5%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Autenticação</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">35</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">30</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">3</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-600">2</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">85.7%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Relatórios</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">28</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">20</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">4</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-600">4</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">71.4%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="py-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Falhas Recentes</h4>
              <ul className="space-y-3">
                <li className="bg-red-50 p-3 rounded">
                  <p className="text-sm font-medium text-red-800">Gerar Relatório no SGPT</p>
                  <p className="text-xs text-gray-700 mt-1">Falhou em 18 de março de 2025</p>
                  <p className="text-sm mt-1 text-gray-700">
                    Esperado: O relatório é gerado com sucesso e exibido para o usuário.
                  </p>
                  <p className="text-sm mt-1 text-gray-700">
                    Real: Falha na geração do relatório devido à ausência de dados no período.
                  </p>
                </li>
                <li className="bg-red-50 p-3 rounded">
                  <p className="text-sm font-medium text-red-800">Falha na Autenticação de Usuário por Erro no Banco de Dados</p>
                  <p className="text-xs text-gray-700 mt-1">Falhou em 15 de março de 2025</p>
                  <p className="text-sm mt-1 text-gray-700">
                    Esperado: Sistema mostra mensagem "Erro ao conectar ao banco de dados".
                  </p>
                  <p className="text-sm mt-1 text-gray-700">
                    Real: Sistema trava sem mostrar nenhuma mensagem de erro
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
