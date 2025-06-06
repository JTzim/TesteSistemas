const express = require('express');
const router = express.Router();
const TestCase = require('../../models/TestCase');
const TestCaseStep = require('../../models/TestCaseStep');
const Project = require('../../models/Projects');
const RecentActivity = require('../../models/recentActivity');

router.delete('/deleteTestCase/:id/:name/:userId', async (req, res) => {
  const { id, name, userId } = req.params;

  try {
    const testCase = await TestCase.findByPk(id)
    if (!testCase) {
      return res.status(404).json({ message: 'Caso de teste não encontrado' });
    }
    const projects = await Project.findOne({ where: {id: testCase.project_id}});

    await TestCaseStep.destroy({ where: { test_case_id: id } });
    await Project.update({testCount: projects.testCount - 1},{where: {id: projects.id}})
    await TestCase.destroy({ where: { id } });
    await RecentActivity.create({
      id_user: userId,
      action: `Excluiu o caso de teste: ${name}`,
      time: new Date(),
      status: 'failed'
    });

    res.status(200).json({ message: 'Caso de teste excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir caso de teste:', error);
    res.status(500).json({ message: 'Erro ao excluir caso de teste' });
  }
});

module.exports = router;
