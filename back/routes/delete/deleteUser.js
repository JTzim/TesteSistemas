const express = require('express');
const User = require('../../models/Users');
const router = express.Router();

router.delete('/deleteUser/:email', async(req,res)=>{
    const email = req.params.email

    try {
       await User.destroy({
            where: {email: email}
       }) 
       res.status(200).json({message: 'Usuário excluido com sucesso'})
    } catch (error) {
        res.status(503).json({message: error.message})
    }
})

module.exports = router;