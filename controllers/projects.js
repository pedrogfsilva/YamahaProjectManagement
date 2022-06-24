// Controle das ações executadas no banco de dados.

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const dbPath = './database/yamaha.db';
const db = new sqlite3.Database(dbPath);
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Operação (Selecionar todos) realizada com os atributos definidos abaixo.
// Junção de duas tabelas a partir do inner join
const getAllProjects = (req, res) =>{
    const sql = 'SELECT * FROM Projeto INNER JOIN Governanca ON Governanca.GovernancaID = Projeto.GovernancaID';
    db.all(sql, [], (err, rows) =>{
        if(err){
            throw err;
        } else {
            res.json(rows);
        }
    });
}

// Operação (Criação/Adição) realizada com os atributos definidos abaixo.
const createProject = (req, res) =>{
    const name = req.body.nome;
    const description = req.body.descricao;
    const principalResponsible = req.body.responsavel;
    const beginDate = req.body.datainicial;
    const finalDate = req.body.datafinal;
    const governaceID = req.body.governanca;
    const employeeID = req.body.FuncionarioID;

    const sql = `INSERT INTO Projeto (NomeProjeto, Descricao, PrincipalResponsavel, DataInicial, DataFinal, GovernancaID, FuncionarioID) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.run(sql, [name, description, principalResponsible, beginDate, finalDate, governaceID, employeeID], (err) =>{
        if(err){
            throw err;
        } else {
            res.render('novoProjeto');
        }
    });
}

// Operação (Deletar) realizada com os atributos definidos abaixo.
const deleteProject = (req, res) =>{
    const { id } = req.params;
    const sql = `DELETE FROM Projeto WHERE ProjetoID = ${id}`;
    db.run(sql, [], (err) =>{
        if(err){
            throw err;
        } else {
            res.send('Projeto deletado com sucesso!');
        }
    });
}

module.exports = {
    getAllProjects,
    createProject,
    deleteProject,
}