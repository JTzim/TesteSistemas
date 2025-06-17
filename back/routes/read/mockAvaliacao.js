const express = require('express');
const router = express.Router();
const { Avaliacao, Project, User } = require('../../models/associations');

// Rota para obter todas as avaliações
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

    // Formata as avaliações para o formato esperado pelo frontend
    const avaliacoesFormatadas = avaliacoes.map(avaliacao => ({
      id: avaliacao.id,
      title: avaliacao.title,
      createdAt: avaliacao.createdAt,
      projectId: avaliacao.projectId,
      createdBy: avaliacao.createdBy,
      projectName: avaliacao.Project?.name,
      createdByName: avaliacao.User?.name,
      // Adiciona o campo name para o select
      name: avaliacao.title
    }));

    res.json(avaliacoesFormatadas);
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    res.status(500).json({ message: 'Erro ao buscar avaliações' });
  }
});

module.exports = router;
