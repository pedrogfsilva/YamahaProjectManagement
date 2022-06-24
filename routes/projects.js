// Rotas que conectam a tabela "Projeto" do banco de dados com o código.

const express = require('express');
const projectsController = require('../controllers/projects');

const router = express.Router();

router.get('/', projectsController.getAllProjects);//Retorna todos os dados presentes na tabela

router.post('/', projectsController.createProject);// Cria um dado na tabela

router.delete('/:id', projectsController.deleteProject);// Deleta

module.exports = router;