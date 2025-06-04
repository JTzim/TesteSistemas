import React, { useEffect, useState } from 'react';

const BarChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBarData = async () => {
      try {
        const response = await fetch('http://localhost:3000/countCategory');
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        const result = await response.json();
        setData(result || []);
      } catch (error) {
        console.error('Erro ao buscar dados do gráfico de barras:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBarData();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Carregando...</div>;
  }

  if (!data.length) {
    return <div className="text-center text-red-500">Nenhum dado disponível.</div>;
  }

  const maxValue = Math.max(...data.map(item => item.passed + item.failed + item.pending));

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-4">
        {data.map((item, index) => {
          const total = item.passed + item.failed + item.pending || 1;
          const passedWidth = (item.passed / maxValue) * 100;
          const failedWidth = (item.failed / maxValue) * 100;
          const pendingWidth = (item.pending / maxValue) * 100;

          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                <span className="text-sm text-gray-500">
                  {total} tests
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="flex h-3 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${passedWidth}%` }}
                    className="bg-green-500"
                  />
                  <div
                    style={{ width: `${failedWidth}%` }}
                    className="bg-red-500"
                  />
                  <div
                    style={{ width: `${pendingWidth}%` }}
                    className="bg-amber-500"
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-green-600">{item.passed} passed</span>
                <span className="text-red-600">{item.failed} failed</span>
                <span className="text-amber-600">{item.pending} pending</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
