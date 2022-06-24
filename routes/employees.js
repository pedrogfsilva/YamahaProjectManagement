// Rotas que conectam a tabela "Funcionario" do banco de dados com o código.

const express = require('express');
const employeesController = require('../controllers/employees');

const router = express.Router();

router.get('/', employeesController.getAllEmployees);//Retorna todos os dados presentes na tabela

router.get('/:id', employeesController.getEmployeeById);//Retorna por Id

router.post('/', employeesController.createEmployee);// Cria um dado na tabela

router.post('/:id', employeesController.updateEmployee);//Altera um dado existente na tabela 

router.delete('/:id', employeesController.deleteEmployee);// Deleta

module.exports = router;