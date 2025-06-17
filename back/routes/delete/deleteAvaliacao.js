const express = require('express');
const router = express.Router();
const Avaliacao = require('../../models/avaliacao');
const CriterioAvaliacao = require('../../models/criterioAvaliacao');

router.delete('/deleteAvaliacao/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const avaliacao = await Avaliacao.findByPk(id);
    if (!avaliacao) {
      return res.status(404).json({ message: 'Avaliação não encontrada' });
    }

    await CriterioAvaliacao.destroy({
      where: {
        fkAvaliacao: id
      }
    });

    // Remove a avaliação
    await avaliacao.destroy();

    res.json({ message: 'Avaliação e seus critérios foram excluídos com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir avaliação:', error);
    res.status(500).json({ message: 'Erro ao excluir avaliação' });
  }
});

module.exports = router;
