const express = require('express');
const router = express.Router();
const Avaliacao = require('../../models/avaliacao');
const Projects = require('../../models/Projects');

router.post('/', async (req, res) => {
  try {
    const { projectId, createdBy } = req.body;

    
    const project = await Projects.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    
    const title = `Ava - ${project.name}`;

    
    const avaliacao = await Avaliacao.create({
      id: Math.random().toString(36).substr(2, 9),
      title,
      projectId,
      createdBy,
      createdAt: new Date()
    });

    res.status(201).json(avaliacao);
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    res.status(500).json({ message: 'Erro ao criar avaliação' });
  }
});

module.exports = router;
