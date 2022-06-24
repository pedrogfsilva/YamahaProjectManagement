// Rotas que conectam a tabela "Funcao" do banco de dados com o código.

const express = require('express');
const roleController = require('../controllers/role');

const router = express.Router();

router.get('/', roleController.getAllRole);// Retorna todos os dados presentes na tabela Funcao

router.get('/:id', roleController.getRoleById);// Retorna por Id

router.post('/', roleController.createRole);// Cria um dado na tabela

router.patch('/:id', roleController.updateRole);// Altera um dado existente na tabela 

router.delete('/:id', roleController.deleteRole);// Deleta

module.exports = router;