const { Sequelize, sequelize } = require('./database');

class Avaliacao extends Sequelize.Model {}

Avaliacao.init({
  id: {
    type: Sequelize.STRING(9),
    allowNull: false,
    primaryKey: true
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'created_at'
  },
  projectId: {
    type: Sequelize.STRING(9),
    allowNull: false,
    field: 'project_id',
    references: {
      model: 'projects',
      key: 'id'
    }
  },
  createdBy: {
    type: Sequelize.STRING(9),
    allowNull: false,
    field: 'created_by',
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Avaliacao',
  tableName: 'avaliacao',
  timestamps: false
});

module.exports = Avaliacao;
