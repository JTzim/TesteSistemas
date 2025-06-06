const express = require('express');
const Project = require('../../models/Projects');
const TestPlan = require('../../models/TestPlan');
const TestCase = require('../../models/TestCase');
const RecentActivity = require('../../models/recentActivity');
const router = express.Router();

router.delete('/deleteProject/:id/:projectName/:userId', async(req,res)=>{
    const { id, projectName, userId } = req.params;

    try {
        
        await TestCase.destroy({
            where: { projectId: id }
        });

        await TestPlan.destroy({
            where: { projectId: id }
        });

    
        await Project.destroy({ where: { id } });

        await RecentActivity.create({
            id_user: userId,
            action: `Excluiu o projeto: ${projectName}`,
            time: new Date(),
            status: 'failed'
        });

        res.status(200).json({message: 'Projeto excluido com sucesso'})
    } catch (error) {
        console.error('Erro ao excluir projeto:', error);
        res.status(503).json({message: error.message})
    }
})

module.exports = router;