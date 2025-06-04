const express = require('express');
const router = express.Router();
const TestCase = require('../models/TestCase');
const { Sequelize } = require('../models/database');

router.get('/countCategory', async (req, res) => {
  try {
    const results = await TestCase.findAll({
      attributes: [
        'category',
        'status',
        [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']
      ],
      group: ['category', 'status']
    });

    
    const groupedData = {};

    results.forEach(result => {
      const { category, status, count } = result.get();
      const key = category || 'Sem Categoria';

      if (!groupedData[key]) {
        groupedData[key] = { name: key, passed: 0, failed: 0, pending: 0 };
      }

      groupedData[key][status] = parseInt(count, 10);
    });

    const response = Object.values(groupedData);
    res.json(response);
  } catch (error) {
    console.error('Erro ao contar categorias:', error);
    res.status(500).json({ error: 'Erro ao buscar contagem de categorias' });
  }
});

module.exports = router;
