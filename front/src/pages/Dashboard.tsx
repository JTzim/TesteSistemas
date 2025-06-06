import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  ClipboardCheck, 
  AlertCircle, 
  Clock, 
  Activity,
  CheckCircle2,
  XCircle,
  PauseCircle,
  Calendar
} from 'lucide-react';
import StatCard from '../components/StatCard';
import BarChart from '../components/charts/BarChart';
import DonutChart from '../components/charts/DonutChart';
import { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any[]>([]);

   useEffect(() => {
  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:3000/countTest');
      const data = await response.json();
      setStats([
        { title: 'Total de Testes', value: data.totalTests || '0', icon:<ClipboardCheck size={24} className="text-blue-500" />},
        { title: 'Falha de Testes', value: data.failedTests || '0', icon: <AlertCircle size={24} className="text-red-500" />},
        { title: 'Testes Pendentes', value: data.pendingTests || '0', icon: <Clock size={24} className="text-amber-500" />},
        { title: 'Taxa de Aprovação', value: `${data.passRate}%` || '0%', icon: <Activity size={24} className="text-green-500" />},
      ]);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  fetchStats();
  
}, []);


  const recentActivity = [
    { id: 1, user: 'Luana Martins', action: 'Updated test case', test: 'User Authentication', time: '10 minutes ago', status: 'Aprovado' },
    { id: 2, user: 'Admin User', action: 'Created new project', test: 'Payment Processing API', time: '1 hour ago', status: 'pending' },
    { id: 3, user: 'Beto Silva', action: 'Failed test case', test: 'Order Checkout', time: '2 hours ago', status: 'Falha' },
    { id: 4, user: 'Luana Martins', action: 'Updated test plan', test: 'User Profile Management', time: '3 hours ago', status: 'Aprovado' },
    { id: 5, user: 'Admin User', action: 'Added new tester', test: 'Carlos Mendes', time: '5 hours ago', status: 'Pendente' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return <CheckCircle2 size={16} className="text-green-500" />;
      case 'Falha':
        return <XCircle size={16} className="text-red-500" />;
      case 'Pendente':
        return <PauseCircle size={16} className="text-amber-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Bem-vindo, {user?.name}</h2>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="mr-1" size={16} />
          {new Date().toLocaleDateString('pt-br', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Resultados de Teste por Categoria</h3>
          <BarChart />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Geral dos Testes</h3>
          <DonutChart />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Atividades Recentes</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="px-6 py-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(activity.status)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.user} <span className="font-normal text-gray-600">{activity.action}</span>
                    </p>
                    <p className="text-sm text-gray-700">{activity.test}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;