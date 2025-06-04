const express = require('express')
const router = express.Router();
const TestPlan  =  require('../../models/TestPlan');
const Project = require('../../models/Projects');
const User = require('../../models/Users');

router.post('/createTestPlan', async(req,res)=>{
    const {id, title, description, project, startDate, endDate, testCount, progress, createdBy, createdAt} = req.body
    try {
        const verificTestPlan =  await TestPlan.findOne({where:{title}})
        if(verificTestPlan){
            console.log('Plano de teste já cadastrado')
            return res.json({ message: 'Plano de teste já cadastrado' });
        }
        const user = await User.findOne({ where: {name: createdBy} });
        const projects = await Project.findOne({ where: {name: project}});
        if(!user || !projects){
            console.log('Projeto ou usuário não existem')
            return res.json({ message: 'Projeto ou usuário não existem' });
        }

        const newTestPlan = {
            id,
            title,
            description,
            startDate,
            endDate,
            testCount,
            progress,
            projectId: projects.id,
            createdBy: user.id
        }
        await TestPlan.create(newTestPlan);
        res.status(200).json({message: 'Plano de teste criado'}) 
    } catch (error) {
        res.status(503).json({message: error.message})
    }
})

module.exports = router;