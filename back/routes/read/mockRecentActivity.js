const express = require('express');
const router = express.Router();
const RecentActivity = require('../../models/recentActivity');
const User = require('../../models/Users');

router.get('/mockRecentActivity', async (req, res) => {
    try {
        const recentActivity = await RecentActivity.findAll({
            include: [{
                model: User,
                attributes: ['name'],
                as: 'user'
            }],
            order: [['time', 'DESC']],
            limit: 10
        });
        
        const formattedActivity = recentActivity.map(activity => ({
            id: activity.id,
            id_user: activity.id_user,
            userName: activity.user ? activity.user.name : 'Usuário Desconhecido',
            action: activity.action,
            time: activity.time,
            status: activity.status
        }));

        res.status(200).json(formattedActivity);
    } catch (error) {
        console.error('Erro ao buscar atividades recentes:', error);
        res.status(500).json({ message: 'Erro ao buscar atividades recentes' });
    }   
});

module.exports = router;    