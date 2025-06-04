const express = require('express');
const User = require('../models/Users');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        if (user.senha !== password) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        return res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });

    } catch (err) {
        console.error('Erro ao tentar login:', err);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
});

module.exports = router;