const express = require('express');
const User = require('../../models/Users');
const router = express.Router();
const RecentActivity = require('../../models/recentActivity');

router.delete('/deleteUser/:email/:name/:userId', async(req,res)=>{
    const {email, name, userId} = req.params

    try {
       await User.destroy({
            where: {email: email}
       }) 
       await RecentActivity.create({
        id_user: userId,
        action: `Excluiu o usuário: ${name}`,
        time: new Date(),
        status: 'failed'
       })
       res.status(200).json({message: 'Usuário excluido com sucesso'})
    } catch (error) {
        res.status(503).json({message: error.message})
    }
})

module.exports = router;