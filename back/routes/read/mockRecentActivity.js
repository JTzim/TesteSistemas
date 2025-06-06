const express = require('express');
const router = express.Router();
const RecentActivity = require('../../models/recentActivity');

router.get('/mockRecentActivity', async (req, res) => {
    try {
        const recentActivity = await RecentActivity.findAll();
        res.status(200).json(recentActivity);
    } catch (error) {
        console.error('Erro ao buscar atividades recentes:', error);
        res.status(500).json({ message: 'Erro ao buscar atividades recentes' });
    }   
});

module.exports = router;    