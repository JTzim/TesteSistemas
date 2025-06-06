const express = require('express');
const router = express.Router();
const TestPlan = require('../../models/TestPlan');
const RecentActivity = require('../../models/recentActivity');

router.delete('/deleteTestPlan/:id/:name/:userId', async(req,res)=>{
    const {id, name, userId} = req.params
    
        try {
            await TestPlan.destroy({where: {id}})
            await RecentActivity.create({
                id_user: userId,
                action: `Excluiu o plano de teste: ${name}`,
                time: new Date(),
                status: 'failed'
            })
            res.status(200).json({message: 'Plano de teste excluido com sucesso'})
        } catch (error) {
            res.status(503).json({message: error.message})
        }
})

module.exports = router