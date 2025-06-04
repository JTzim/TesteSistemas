const express = require('express');
const router = express.Router();
const TestCase = require('../models/TestCase')

router.get('/countTest', async(req,res)=>{
    try {
        const totalTests = await TestCase.findAndCountAll();
        const passedTests = await TestCase.count({where:{status: 'passed'}});
        const failedTests = await TestCase.count({where:{status: 'failed'}});
        const pendingTests = await TestCase.count({where:{status: 'pending'}});
        const passRate = calcRate(totalTests.count, passedTests);
        res.status(200).json({totalTests: totalTests.count,passedTests, failedTests, pendingTests, passRate})
    } catch (error) {
        console.error('Erro ao buscar casos de teste:', error);
        res.status(500).json({ message: 'Erro ao buscar casos de teste' });
    }
})

function  calcRate(total, passed){
    const rate  = (passed*100) / total
    const formatado = Math.round(rate * 100) /100;
    return formatado
}

module.exports =  router;