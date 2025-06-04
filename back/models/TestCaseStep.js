const { Sequelize, sequelize } = require('./database');

class TestCaseStep extends Sequelize.Model {}

  TestCaseStep.init({
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    test_case_id: {
      type: Sequelize.CHAR(9),
      allowNull: false,
    },
    step_order: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'TestCaseStep',
    tableName: 'test_case_steps',
    timestamps: false,
  });

module.exports = TestCaseStep;
