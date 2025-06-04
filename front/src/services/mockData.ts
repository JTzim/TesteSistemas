import { User, Project, TestCase, TestPlan } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    active: true,
    createdAt: '2025-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Luana Martins',
    email: 'MartinsLua@gmail.com',
    role: 'tester',
    active: true,
    createdAt: '2025-02-20T14:45:00Z'
  },
  {
    id: '3',
    name: 'Beto Silva',
    email: 'Beto159@gmail.com',
    role: 'programmer',
    active: true,
    createdAt: '2025-02-28T09:15:00Z'
  },
  {
    id: '4',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@example.com',
    role: 'tester',
    active: true,
    createdAt: '2025-03-10T11:00:00Z'
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Gerenciamento de Teste',
    description: 'Sistema destinado à realização de testes automatizados.',
    version: '1.0.0',
    createdAt: '2025-03-10T14:30:00Z',
    testCount: 42
  },
  {
    id: '2',
    name: 'Sistema de Pagamentos',
    description: 'API de processamento de pagamentos com múltiplos gateways.',
    version: '2.1.5',
    createdAt: '2025-02-18T09:15:00Z',
    testCount: 78
  },
  {
    id: '3',
    name: 'Portal de Atendimento',
    description: 'Portal para atendentes gerenciarem tickets de suporte.',
    version: '3.0.1',
    createdAt: '2025-01-05T11:22:00Z',
    testCount: 63
  }
];

export const mockTestCases: TestCase[] = [
  {
    id: '1',
    title: 'Cadastro do projeto no sistema',
    description: 'Verificar se é possível cadastrar um novo projeto no sistema corretamente',
    steps: [
      'Acessar a tela de "Cadastro de Sistema"',
      'Preencher os dados do novo sistema',
      'Clicar no botão "Cadastrar"',
      'Verificar a mensagem de confirmação'
    ],
    expected: 'O sistema cadastra o novo sistema e exibe uma mensagem de confirmação.',
    status: 'passed',
    project: 'Gerenciamento de Teste',
    category: 'Cadastro',
    createdBy: 'Admin User',
    createdAt: '2025-03-10T14:30:00Z',
  },
  {
    id: '2',
    title: 'Cadastro no Sistema com Dados Inválidos',
    description: 'Verifica se o sistema impede corretamente o cadastro com dados inválidos',
    steps: [
      'Preencher os dados de forma incorreta',
      'Clicar no botão "Cadastrar"',
      'Verificar mensagens de erro',
      'Corrigir os erros e tentar novamente'
    ],
    expected: 'O sistema não permite o cadastro até que os erros sejam corrigidos.',
    status: 'passed',
    project: 'Gerenciamento de Teste',
    category: 'Validação',
    createdBy: 'Luana Martins',
    createdAt: '2025-03-11T10:15:00Z',
  },
  {
    id: '3',
    title: 'Autenticação de Usuário',
    description: 'Verificar se o login funciona corretamente para usuários cadastrados',
    steps: [
      'Acessar a tela de login',
      'Informar credenciais',
      'Clicar no botão "Entrar"',
      'Verificar redirecionamento'
    ],
    expected: 'O usuário é autenticado no sistema e tem acesso às suas funcionalidades.',
    status: 'pending',
    project: 'Gerenciamento de Teste',
    category: 'Autenticação',
    createdBy: 'Beto Silva',
    createdAt: '2025-03-15T09:22:00Z',
  },
  {
    id: '4',
    title: 'Gerar Relatório no SGPT',
    description: 'Verificar se a geração de relatórios funciona conforme esperado',
    steps: [
      'Acessar o menu de relatórios',
      'Selecionar tipo de relatório',
      'Definir período',
      'Clicar em "Gerar Relatório"',
      'Verificar conteúdo'
    ],
    expected: 'O relatório é gerado com sucesso e exibido para o usuário.',
    status: 'failed',
    project: 'Gerenciamento de Teste',
    category: 'Relatórios',
    createdBy: 'Admin User',
    createdAt: '2025-03-18T16:45:00Z',
  }
];

export const mockTestPlans: TestPlan[] = [
  {
    id: '1',
    title: 'Sprint 1 Regression Tests',
    description: 'Full regression testing for Sprint 1 features',
    project: 'Gerenciamento de Teste',
    startDate: '2025-04-01',
    endDate: '2025-04-10',
    testCount: 32,
    progress: 75,
    createdBy: 'Admin User',
  },
  {
    id: '2',
    title: 'Payment API Integration Tests',
    description: 'End-to-end tests for payment processing API',
    project: 'Sistema de Pagamentos',
    startDate: '2025-03-15',
    endDate: '2025-03-25',
    testCount: 18,
    progress: 90,
    createdBy: 'Luana Martins',
  },
  {
    id: '3',
    title: 'User Portal Acceptance Tests',
    description: 'User acceptance testing for the customer portal',
    project: 'Portal de Atendimento',
    startDate: '2025-04-12',
    endDate: '2025-04-18',
    testCount: 24,
    progress: 30,
    createdBy: 'Beto Silva',
  }
];