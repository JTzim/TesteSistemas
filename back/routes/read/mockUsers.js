const express = require('express');
const User = require('../../models/Users');
const router = express.Router();

router.get('/mockUsers', async (req,res)=>{
    try {
    const users = await User.findAll();
    res.status(200).json(users); 
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Usuários não encontrados' });
  }
})

module.exports = router;