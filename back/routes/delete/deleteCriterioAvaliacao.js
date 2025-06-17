const express = require('express');
const router = express.Router();
const CriterioAvaliacao = require('../../models/criterioAvaliacao');

router.delete('/deleteCriterioAvaliacao/:id', async (req, res) => {
  try {
    const { id } = req.params;

    
    const criterio = await CriterioAvaliacao.findByPk(id);
    if (!criterio) {
      return res.status(404).json({ message: 'Critério não encontrado' });
    }

    
    await criterio.destroy();

    res.json({ message: 'Critério excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir critério de avaliação:', error);
    res.status(500).json({ message: 'Erro ao excluir critério de avaliação' });
  }
});

module.exports = router;

