const { Sequelize, sequelize } = require('./database');

class CriterioAvaliacao extends Sequelize.Model {}

CriterioAvaliacao.init({
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  avaliador: {
    type: Sequelize.STRING(9),
    allowNull: false
  },
  descricao: {
    type: Sequelize.STRING(500),
    allowNull: false
  },
  criterio: {
    type: Sequelize.ENUM(
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
    ),
    allowNull: false
  },
  fkAvaliacao: {
    type: Sequelize.STRING(9),
    allowNull: false,
    field: 'fk_avaliacao'
  }
}, {
  sequelize,
  modelName: 'CriterioAvaliacao',
  tableName: 'criterioAvaliacao',
  timestamps: false
});

module.exports = CriterioAvaliacao;
