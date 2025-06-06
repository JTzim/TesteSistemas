const express = require('express');
const User = require('../../models/Users');
const RecentActivity = require('../../models/recentActivity');
const router = express.Router();

router.put('/editUser/:id', async(req,res)=>{
    const {name, email, role, active, password, userId} = req.body
    const id = req.params.id
    console.log(id)
    try {
        if(password === ''){
            await  User.update({
            name,
            email,
            role,
            active},
            { where: {id: id} }
        )
        }else{
            await  User.update({
            name,
            email,
            role,
            active,
            senha: password},
            { where: {id: id} }
        )
        }
        await RecentActivity.create({
            id_user: userId,
            action: `Atualizou o usuário: ${name}`,
            time: new Date(),
            status: 'pending'
        })
        res.status(200).json({message: 'Usuário atualizado com sucesso'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})

module.exports = router;