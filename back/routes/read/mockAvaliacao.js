const express = require('express');
const router = express.Router();
const Avaliacao = require('../../models/avaliacao');
const Projeto = require('../../models/project');
const User = require('../../models/Users');

// Rota para obter todas as avaliações
router.get('/mockAvaliacoes', async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.findAll({
      include: [
        {
          model: Projeto,
          attributes: ['name']
        },
        {
          model: User,
          attributes: ['name']
        }
      ]
    });

    const avaliacoesFormatadas = avaliacoes.map(avaliacao => ({
      id: avaliacao.id,
      title: avaliacao.title,
      createdAt: avaliacao.createdAt,
      projectId: avaliacao.projectId,
      createdBy: avaliacao.createdBy,
      projectName: avaliacao.Projeto?.name,
      createdByName: avaliacao.User?.name
    }));

    res.json(avaliacoesFormatadas);
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    res.status(500).json({ message: 'Erro ao buscar avaliações' });
  }
});

module.exports = router;
