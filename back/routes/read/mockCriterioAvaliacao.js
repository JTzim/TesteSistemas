const express = require('express');
const router = express.Router();
const CriterioAvaliacao = require('../../models/criterioAvaliacao');
const Avaliacao = require('../../models/avaliacao');
const User = require('../../models/Users');


router.get('/mockCriteriosAvaliacao', async (req, res) => {
  try {
    const criterios = await CriterioAvaliacao.findAll({
      include: [
        {
          model: Avaliacao,
          as: 'avaliacao',
          attributes: ['title']
        },
        {
          model: User,
          as: 'userAvaliador',
          attributes: ['name']
        }
      ]
    });

    
    const criteriosFormatados = criterios.map(criterio => ({
      id: criterio.id,
      avaliador: criterio.avaliador,
      descricao: criterio.descricao,
      criterio: criterio.criterio,
      nota: criterio.nota,
      fkAvaliacao: criterio.fkAvaliacao,
      avaliadorName: criterio.userAvaliador?.name,
      avaliacaoName: criterio.avaliacao?.title
    }));

    res.json(criteriosFormatados);
  } catch (error) {
    console.error('Erro ao buscar critérios de avaliação:', error);
    res.status(500).json({ message: 'Erro ao buscar critérios de avaliação' });
  }
});

module.exports = router;
