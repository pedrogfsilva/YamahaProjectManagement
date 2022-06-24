// Rotas que conectam a tabela "Governanca" do banco de dados com o código.

const express = require('express');
const governanceController = require('../controllers/governance');
const projectsController = require('../controllers/projects');

const router = express.Router();

router.get('/', governanceController.getAllGovernance);// Retorna todos os dados da tabela

router.get('/:id', governanceController.getGovernanceById);// Retorna por Id

router.post('/', governanceController.createGovernance);// Cria um dado na tabela

router.patch('/:id', governanceController.updateGovernance);// Altera um dado existente na tabela 

router.delete('/:id', governanceController.deleteGovernance);// Deleta

module.exports = router;