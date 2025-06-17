import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CriterioAvaliacao {
  id: number;
  avaliador: string;
  descricao: string;
  criterio: 'Eficiência' | 'Eficácia' | 'Satisfação do Usuário' | 'Aprendizado' | 'Memorabilidade' | 'Prevenção de Erros' | 'Acessibilidade' | 'Consistência e Padrões' | 'Feedback' | 'Flexibilidade' | 'Segurança no uso' | 'Usabilidade' | 'Comunicabilidade';
  fkAvaliacao: string;
}

interface CriterioAvaliacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (criterio: CriterioAvaliacao) => void;
  criterio: CriterioAvaliacao | null;
  avaliacoes: {id: string, name: string}[];
}

const CriterioAvaliacaoModal: React.FC<CriterioAvaliacaoModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  criterio,
  avaliacoes 
}) => {
  const [formData, setFormData] = useState({
    id: 0,
    avaliador: '',
    descricao: '',
    criterio: 'Eficiência' as CriterioAvaliacao['criterio'],
    fkAvaliacao: ''
  });

  const criterioOptions: CriterioAvaliacao['criterio'][] = [
    'Eficiência',
    'Eficácia',
    'Satisfação do Usuário',
    'Aprendizado',
    'Memorabilidade',
    'Prevenção de Erros',
    'Acessibilidade',
    'Consistência e Padrões',
    'Feedback',
    'Flexibilidade',
    'Segurança no uso',
    'Usabilidade',
    'Comunicabilidade'
  ];

  useEffect(() => {
    if (criterio) {
      setFormData({
        ...criterio
      });
    } else {
      setFormData({
        id: 0,
        avaliador: '',
        descricao: '',
        criterio: 'Eficiência',
        fkAvaliacao: avaliacoes[0]?.id || ''
      });
    }
  }, [criterio, isOpen, avaliacoes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                {criterio ? 'Editar Critério' : 'Novo Critério'}
              </h3>
              <button
                type="button"
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <span className="sr-only">Fechar</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="criterio" className="block text-sm font-medium text-gray-700">
                  Critério
                </label>
                <select
                  id="criterio"
                  name="criterio"
                  value={formData.criterio}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  {criterioOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                  Descrição
                </label>
                <textarea
                  name="descricao"
                  id="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Descreva o critério de avaliação"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="fkAvaliacao" className="block text-sm font-medium text-gray-700">
                  Avaliação
                </label>
                <select
                  id="fkAvaliacao"
                  name="fkAvaliacao"
                  value={formData.fkAvaliacao}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Selecione uma Avaliação</option>
                  {avaliacoes.map(avaliacao => (
                    <option key={avaliacao.id} value={avaliacao.id}>
                      {avaliacao.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {criterio ? 'Atualizar Critério' : 'Criar Critério'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriterioAvaliacaoModal; 