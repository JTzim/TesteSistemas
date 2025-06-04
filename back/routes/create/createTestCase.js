const express = require('express');
const router = express.Router();
const TestCase = require('../../models/TestCase');
const Project = require('../../models/Projects');
const User = require('../../models/Users');
const TestCaseStep = require('../../models/TestCaseStep');

router.post('/createTestCase', async(req,res)=>{
    const {id, title, description, steps, expected, status, project, category, createdBy, createdAt} = req.body
    
    try {
        const verificTestCase = await TestCase.findOne({where:{title}});
        if(verificTestCase){
            console.log('Caso de teste já cadastrado')
            return res.json({ message: 'Caso de teste já cadastrado' });
        }
        const user = await User.findOne({ where: {name: createdBy} });
        const projects = await Project.findOne({ where: {name: project}});
        
        if(!user || !projects){
            console.log('Projeto ou usuário não existem')
            return res.json({ message: 'Projeto ou usuário não existem' });
        }
       const newTestCase ={
            id,
            title,
            description,
            expected,
            status,
            category,
            createdAt,
            projectId: projects.id,
            createdBy: user.id
       }
       
       await TestCase.create(newTestCase);
       await Project.update({testCount: projects.testCount + 1},{where: {id: projects.id}})
       if(steps){
        createTestCaseStep(id, steps);
       }
       res.status(200).json({message: 'Caso de teste criado'}) 
    } catch (error) {
        res.status(503).json({message: error.message})
    }

})

const createTestCaseStep = async (idTestCase, steps) => {
    try {
        for (let i = 0; i < steps.length; i++) {
            await TestCaseStep.create({
                test_case_id: idTestCase,
                step_order: i + 1,
                description: steps[i]
            });
        }
    } catch (error) {
        console.error('Erro ao criar passos do caso de teste:', error.message);
    }
};


module.exports = router;