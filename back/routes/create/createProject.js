const express = require('express');
const Project = require('../../models/Projects');
const RecentActivity = require('../../models/recentActivity');
const router = express.Router();

router.post('/createProject', async(req,res)=>{
    const {id, name, description, version, createdAt, userId} = req.body;
    
    try {
        const verificProject = await Project.findOne({ where: { name } })
        if(verificProject){
            return res.json({ message: 'Projeto já cadastrado' });
        }
        const newProject = {
            id,
            name,
            description,
            version,
            createdAt,
            testCount: 0
        }
        
        const project = await Project.create(newProject);

        // Registrar a atividade recente
        await RecentActivity.create({
            id_user: userId,
            action: `Criou o projeto: ${name}`,
            time: new Date(),
            status: 'passed'
        });

        res.status(200).json({message: 'Projeto criado'})
    } catch (error) {
        res.status(503).json({message: error.message})
    }
})

module.exports =  router