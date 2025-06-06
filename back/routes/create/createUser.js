const express = require('express');
const User = require('../../models/Users');
const RecentActivity = require('../../models/recentActivity');
const router = express.Router();

router.post('/createUser', async(req,res)=>{
    const {id, name, email, role, active, password, createdAt, createdBy} = req.body;

    try {
        const verificEmail = await User.findOne({ where: { email } });

        if(verificEmail){
            return res.json({ message: 'Email já cadastrado' });
        }
        const newUser = {
            id,
            name,
            email,
            role,
            senha: password,
            createdAt
        }
        await User.create(newUser);
        
        await RecentActivity.create({
            id_user: createdBy,
            action: `Criou um novo usuário: ${name}`,
            time: new Date(),
            status: 'passed'
        })
        res.status(200).json({message: 'Usuário criado'})
    } catch (error) {
        res.status(503).json({message: error.message})
    }
})

module.exports = router;