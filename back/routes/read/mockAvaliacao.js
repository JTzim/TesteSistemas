const express = require('express');
const router = express.Router();
const { Avaliacao, Project, User} = require('../../models/associations');


router.get('/mockAvaliacoes', async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.findAll({
      include: [
        {
          model: Project,
          as: 'Project',
          attributes: ['name']
        },
        {
          model: User,
          as: 'User',
          attributes: ['name']
        }
      ]
    });

    
    const avaliacoesFormatadas = avaliacoes.map(avaliacao => ({
      id: avaliacao.id,
      title: avaliacao.title,
      media: Math.round((avaliacao.media ?? 0) * 100) / 100,
      createdAt: avaliacao.createdAt,
      projectId: avaliacao.projectId,
      createdBy: avaliacao.createdBy,
      projectName: avaliacao.Project?.name,
      createdByName: avaliacao.User?.name,
      name: avaliacao.title
    }));

    res.json(avaliacoesFormatadas);
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    res.status(500).json({ message: 'Erro ao buscar avaliações' });
  }
});

module.exports = router;
