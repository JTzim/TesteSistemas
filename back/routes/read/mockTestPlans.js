const express = require('express');
const router = express.Router();
const TestPlan = require('../../models/TestPlan');
const Project = require('../../models/Projects');
const User = require('../../models/Users');

TestPlan.belongsTo(Project, { foreignKey: 'project_id' });
TestPlan.belongsTo(User, { foreignKey: 'created_by' });

router.get('/mockTestPlans', async (req, res) => {
  try {
    const testPlans = await TestPlan.findAll({
      include: [
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
    
    const formatted = testPlans.map(plan => ({
      id: String(plan.id),
      title: plan.title,
      description: plan.description,
      project: plan.Project?.name || '',
      startDate: plan.startDate || '',
      endDate: plan.endDate || '',
      testCount: plan.testCount ?? 0,
      progress: plan.progress ?? 0,
      createdBy: plan.User?.name || ''
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Erro ao buscar Planos de Teste:', error);
    res.status(500).json({ error: 'Erro ao buscar Planos de Teste' });
  }
});

module.exports = router;
