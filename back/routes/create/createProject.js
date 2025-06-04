const express = require('express');
const Project = require('../../models/Projects');
const router = express.Router();

router.post('/createProject', async(req,res)=>{
    const {id, name, description, version, createdAt} = req.body;
    
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
        console.log(newProject)
        await  Project.create(newProject);
        res.status(200).json({message: 'Projeto criado'})
    } catch (error) {
        res.status(503).json({message: error.message})
    }
})

module.exports =  router