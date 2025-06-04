const express = require('express');
const router = express.Router();

const TestCase = require('../../models/TestCase');
const Project = require('../../models/Projects');
const User = require('../../models/Users');
const TestCaseStep = require('../../models/TestCaseStep');

//Relacionamentos 
Project.hasMany(TestCase, { foreignKey: 'project_id' });
TestCase.belongsTo(Project, { foreignKey: 'project_id' });

User.hasMany(TestCase, { foreignKey: 'created_by' });
TestCase.belongsTo(User, { foreignKey: 'created_by' });

TestCase.hasMany(TestCaseStep, { foreignKey: 'test_case_id' });
TestCaseStep.belongsTo(TestCase, { foreignKey: 'test_case_id' });

router.get('/mockTestCase', async (req, res) => {
  try {
    const testCases = await TestCase.findAll({
      include: [
        {
          model: TestCaseStep,
          attributes: ['description'],
          order: [['step_order', 'ASC']],
        },
        {
          model: Project,
          attributes: ['name'],
        },
        {
          model: User,
          attributes: ['name'],
        }
      ]
    });

    const formatted = testCases.map(tc => ({
      id: tc.id,
      title: tc.title,
      description: tc.description,
      steps: tc.TestCaseSteps.map(step => step.description),
      expected: tc.expected,
      status: tc.status,
      project: tc.Project?.name || null,
      category: tc.category,
      createdBy: tc.User?.name || null,
      createdAt: tc.createdAt ? tc.createdAt.toISOString() : null,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error('Erro ao buscar casos de teste:', error);
    res.status(500).json({ message: 'Erro ao buscar casos de teste' });
  }
});

module.exports = router;
