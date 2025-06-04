const express = require('express');
const Project = require('../../models/Projects');
const router = express.Router();

router.get('/mockProjects', async(req,res)=>{
    try {
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        res.status(500).json({ message: 'Projetos não encontrados' });
    }
})

module.exports = router;