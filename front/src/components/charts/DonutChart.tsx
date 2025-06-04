import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

const DonutChart = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3000/countTest');
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        const dados = await response.json();

        setStats([
          { value: dados.passedTests || 0 },
          { value: dados.failedTests || 0 },
          { value: dados.pendingTests || 0 },
        ]);
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading || stats.length < 3) {
    return <div className="text-center text-gray-500">Carregando...</div>;
  }

  const data = {
    passed: stats[0].value,
    failed: stats[1].value,
    pending: stats[2].value,
  };

  const total = data.passed + data.failed + data.pending || 1; 
  const passRate = Math.round((data.passed / total) * 100);
  const failRate = Math.round((data.failed / total) * 100);
  const pendingRate = Math.round((data.pending / total) * 100);

  const circleSize = 280;
  const passedOffset = circleSize * (passRate / 100);
  const failedOffset = circleSize * (failRate / 100);
  const pendingOffset = circleSize * (pendingRate / 100);

  let passedStart = 0;
  let failedStart = passedOffset;
  let pendingStart = passedOffset + failedOffset;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="transparent" stroke="#e5e7eb" strokeWidth="10" />
          <circle cx="50" cy="50" r="45" fill="transparent" stroke="#22c55e" strokeWidth="10"
            strokeDasharray={`${passedOffset} ${circleSize - passedOffset}`}
            strokeDashoffset={-passedStart}
            transform="rotate(-90 50 50)"
          />
          <circle cx="50" cy="50" r="45" fill="transparent" stroke="#ef4444" strokeWidth="10"
            strokeDasharray={`${failedOffset} ${circleSize - failedOffset}`}
            strokeDashoffset={-failedStart}
            transform="rotate(-90 50 50)"
          />
          <circle cx="50" cy="50" r="45" fill="transparent" stroke="#f59e0b" strokeWidth="10"
            strokeDasharray={`${pendingOffset} ${circleSize - pendingOffset}`}
            strokeDashoffset={-pendingStart}
            transform="rotate(-90 50 50)"
          />
          <text x="50" y="45" fontFamily="sans-serif" fontSize="12" textAnchor="middle" fill="#4b5563">
            Pass Rate
          </text>
          <text x="50" y="65" fontFamily="sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#1f2937">
            {passRate}%
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 w-full">
        <div className="flex items-center">
          <CheckCircle2 size={16} className="text-green-500 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-900">{data.passed}</p>
            <p className="text-xs text-gray-500">Passed</p>
          </div>
        </div>
        <div className="flex items-center">
          <XCircle size={16} className="text-red-500 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-900">{data.failed}</p>
            <p className="text-xs text-gray-500">Failed</p>
          </div>
        </div>
        <div className="flex items-center">
          <Clock size={16} className="text-amber-500 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-900">{data.pending}</p>
            <p className="text-xs text-gray-500">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
