const express = require('express');
const router = express.Router();
const CriterioAvaliacao = require('../../models/criterioAvaliacao');
const { Op } = require('sequelize');

router.put('/editCriterioAvaliacao/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { criterio, fkAvaliacao } = req.body;

    // Verifica se o critério existe
    const criterioExistente = await CriterioAvaliacao.findByPk(id);
    if (!criterioExistente) {
      return res.status(404).json({ message: 'Critério não encontrado' });
    }

    // Verifica se já existe outro critério com o mesmo nome para a mesma avaliação
    const criterioDuplicado = await CriterioAvaliacao.findOne({
      where: {
        criterio,
        fkAvaliacao,
        id: { [Op.ne]: id } // Exclui o próprio critério da busca
      }
    });

    if (criterioDuplicado) {
      return res.status(400).json({ 
        message: `Já existe um critério "${criterio}" para esta avaliação.` 
      });
    }

    // Atualiza o critério
    await criterioExistente.update(req.body);

    // Busca o critério atualizado com suas relações
    const criterioAtualizado = await CriterioAvaliacao.findByPk(id, {
      include: [
        {
          model: require('../../models/avaliacao'),
          as: 'avaliacao',
          attributes: ['title']
        },
        {
          model: require('../../models/Users'),
          as: 'userAvaliador',
          attributes: ['name']
        }
      ]
    });

    // Formata a resposta
    const criterioFormatado = {
      ...criterioAtualizado.toJSON(),
      avaliadorName: criterioAtualizado.userAvaliador?.name,
      avaliacaoName: criterioAtualizado.avaliacao?.title
    };

    res.json(criterioFormatado);
  } catch (error) {
    console.error('Erro ao editar critério de avaliação:', error);
    res.status(500).json({ message: 'Erro ao editar critério de avaliação' });
  }
});

module.exports = router;
