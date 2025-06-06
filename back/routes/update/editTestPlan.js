const express = require('express');
const router = express.Router();
const TestPlan = require('../../models/TestPlan');
const RecentActivity = require('../../models/recentActivity');  

router.put('/editTestPlan/:id', async(req,res)=>{
    const id = req.params.id
    const {title, description, progress, startDate, endDate, userId} = req.body

    try {
        const testPlan = await TestPlan.findByPk(id)

        if(!testPlan){
            return res.status(404).json({ message: 'Plano de teste não encontrado.' });
        }

        await TestPlan.update(
            {title, description, progress, startDate, endDate},
            {where: {id}}
        )
        await RecentActivity.create({
            id_user: userId,
            action: `Atualizou o plano de teste: ${title}`,
            time: new Date(),
            status: 'pending'
        })
        return res.status(200).json({ message: 'Plano de teste atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao editar plano de teste:', error.message);
        return res.status(500).json({ message: 'Erro ao editar plano de teste.' });
    }
})

module.exports = router