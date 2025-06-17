const express = require('express');
const router = express.Router();
const CriterioAvaliacao = require('../../models/criterioAvaliacao');

router.post('/createCriterioAvaliacao', async (req, res) => {
  try {
    const { criterio, fkAvaliacao } = req.body;

    const criterioExistente = await CriterioAvaliacao.findOne({
      where: {
        criterio,
        fkAvaliacao
      }
    });

    if (criterioExistente) {
      return res.status(400).json({ 
        message: `Já existe um critério "${criterio}" para esta avaliação.` 
      });
    }

    const novoCriterio = await CriterioAvaliacao.create(req.body);
    res.status(201).json(novoCriterio);
  } catch (error) {
    console.error('Erro ao criar critério de avaliação:', error);
    res.status(500).json({ message: 'Erro ao criar critério de avaliação' });
  }
});

module.exports = router;
