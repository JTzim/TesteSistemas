const { Sequelize, sequelize } = require('./database');

class TestCase extends Sequelize.Model {}

TestCase.init({
  id: {
    type: Sequelize.STRING(9),
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING(200),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  expected: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('passed', 'failed', 'pending'),
    allowNull: false
  },
  category: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  projectId: {
    type: Sequelize.STRING(9),
    allowNull: true,
    field: 'project_id'
  },
  createdBy: {
    type: Sequelize.STRING(9),
    allowNull: true,
    field: 'created_by'
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'created_at'
  }
}, {
  sequelize,
  modelName: 'TestCase',
  tableName: 'test_cases',
  timestamps: false
});

module.exports = TestCase;
