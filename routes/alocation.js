// Rotas que conectam a tabela "Alocacao" do banco de dados com o código.

const express = require('express');
const alocationController = require('../controllers/alocation');
const router = express.Router();

router.get('/', alocationController.getAllAlocations);// Retorna todos os dados presentes na tabela

router.post('/', alocationController.createAlocation);// Cria um dado na tabela


module.exports = router;