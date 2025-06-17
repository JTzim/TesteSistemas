const { Sequelize, sequelize } = require('./database');

class Avaliacao extends Sequelize.Model {}

Avaliacao.init({
  id: {
    type: Sequelize.STRING(9),
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING(100),
    allowNull: false
  },  
  media: {
    type: Sequelize.DOUBLE
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'created_at'
  },
  projectId: {
    type: Sequelize.STRING(9),
    allowNull: false,
    field: 'project_id'
  },
  createdBy: {
    type: Sequelize.STRING(9),
    allowNull: false,
    field: 'created_by'
  }
}, {
  sequelize,
  modelName: 'Avaliacao',
  tableName: 'avaliacao',
  timestamps: false
});

module.exports = Avaliacao;
