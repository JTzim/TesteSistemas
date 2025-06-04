const { Sequelize, sequelize } = require('./database');

class Project extends Sequelize.Model {}

Project.init({
  id: {
    type: Sequelize.STRING(9),
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(150),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  version: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  testCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'test_count'
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'created_at'
  }
}, {
  sequelize,
  modelName: 'Project',
  tableName: 'projects',
  timestamps: false
});

module.exports = Project;
