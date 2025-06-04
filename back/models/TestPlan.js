const { Sequelize, sequelize } = require('./database');

class TestPlan extends Sequelize.Model {}

TestPlan.init({
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
  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    field: 'start_date'
  },
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    field: 'end_date'
  },
  testCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'test_count'
  },
  progress: {
    type: Sequelize.INTEGER,
    allowNull: false
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
}, {
  sequelize,
  modelName: 'TestPlan',
  tableName: 'test_plans',
  timestamps: false
});

module.exports = TestPlan;
