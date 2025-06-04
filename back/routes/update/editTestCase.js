const express = require('express');
const router = express.Router();
const TestCase = require('../../models/TestCase');
const TestCaseStep = require('../../models/TestCaseStep');

router.put('/editTestCase/:id', async (req, res) => {
    const { title, description, steps, expected, status, category } = req.body;
    const id = req.params.id;

    try {
        const testCase = await TestCase.findByPk(id);
        if (!testCase) {
            return res.status(404).json({ message: 'Caso de teste não encontrado.' });
        }

        await TestCase.update(
            { title, description, expected, status, category },
            { where: { id } }
        );

        await TestCaseStep.destroy({ where: { test_case_id: id } });

        for (let i = 0; i < steps.length; i++) {
            await TestCaseStep.create({
                test_case_id: id,
                step_order: i + 1,
                description: steps[i]
            });
        }

        return res.status(200).json({ message: 'Caso de teste atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao editar caso de teste:', error.message);
        return res.status(500).json({ message: 'Erro ao editar caso de teste.' });
    }
});

module.exports = router;
