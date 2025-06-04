const express = require('express');
const router = express.Router();
const TestPlan = require('../../models/TestPlan');

router.delete('/deleteTestPlan/:id', async(req,res)=>{
    const id = req.params.id
    
        try {
            await TestPlan.destroy({where: {id}})
            res.status(200).json({message: 'Plano de teste excluido com sucesso'})
        } catch (error) {
            res.status(503).json({message: error.message})
        }
})

module.exports = router