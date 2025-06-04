const express = require('express');
const Project = require('../../models/Projects');
const router = express.Router();

router.delete('/deleteProject/:id', async(req,res)=>{
    const id = req.params.id

    try {
        await Project.destroy({where: {id}})
        res.status(200).json({message: 'Projeto excluido com sucesso'})
    } catch (error) {
        res.status(503).json({message: error.message})
    }
})

module.exports = router;