// Controle das ações executadas no banco de dados.

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const dbPath = './database/yamaha.db';
const db = new sqlite3.Database(dbPath);
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Operação (Selecionar todos) realizada com os atributos definidos abaixo.
// Junção de duas tabelas a partir do left join
const getAllEmployees = (req, res) =>{
    const sql = 'SELECT * FROM Funcionario LEFT JOIN Governanca ON Governanca.GovernancaID = Funcionario.GovernancaID LEFT JOIN Funcao ON Funcao.FuncaoID = Funcionario.FuncaoID';
    db.all(sql, [], (err, rows) =>{
        if(err){
            throw err;
        } else {
            res.json(rows);
        }
    });
}

// Operação (Selecionar por Id) realizada com os atributos definidos abaixo.
const getEmployeeById = (req, res) =>{
    const { id } = req.params;
    const sql = `SELECT * FROM Funcionario WHERE FuncionarioID = ${id}`;
    db.get(sql, [], (err, row) =>{
        if(err){
            throw err;
        } else {
            res.json(row);
        }
    });
}

// Operação (Criação/Adição) realizada com os atributos definidos abaixo.
const createEmployee = (req, res) =>{
    const firstName = req.body.nome;
    const lastName = req.body.sobrenome;
    const funcYamaha = req.body.btnradio;
    const register = req.body.registro;
    const governace = req.body.governanca;
    const company = req.body.empresa;
    const durationContract = req.body.duracaocontrato;
    const hoursProject = req.body.jornadaTrabalho;
    const functionID = req.body.funcaoID;

    const sql = 'INSERT INTO Funcionario (Nome, Sobrenome, FuncionarioYamaha, Registro, Empresa, DuracaoContrato, HorasProjetos, GovernancaID, FuncaoID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    console.log(funcYamaha)
    db.run(sql, [firstName, lastName, funcYamaha, register, company, durationContract, hoursProject, governace, functionID], (err) =>{
        if(err){
            throw err;
        } else {
            res.render('novoFuncionario');
        }
    });
}

// Operação (Alteração) realizada com os atributos definidos abaixo.
const updateEmployee = (req, res) =>{
    const { id } = req.params;

    const firstName = req.body.Nome;
    const lastName = req.body.Sobrenome;
    const employeeYamaha = req.body.FuncionarioYamaha;
    const register = req.body.Registro;
    const hoursProject = req.body.HorasProjetos;
    const position = req.body.Funcao;
    const employeesID = req.body.FuncionarioID;
    const governnaceID = req.body.GovernnacaID;
    const functionID = req.body.FuncaoID;

    const sql = `UPDATE Funcionario SET Nome = ?, Sobrenome = ?, FuncionarioYamaha = ?, Registro = ?, HorasProjetos = ?, FuncionarioID = ?, GovernancaID = ?, FuncaoID = ?, WHERE FuncionarioID = ${id}`;
    db.run(sql, [firstName, lastName, employeeYamaha, register, hoursProject, position, employeesID, governnaceID, functionID], (err) =>{
        if(err){
            throw err;
        } else {
            res.redirect('back');
        }
    });
}

// Operação (Deletar) realizada com os atributos definidos abaixo.
const deleteEmployee = (req, res) =>{
    const { id } = req.params;

    const sql = `DELETE FROM Funcionario WHERE FuncionarioID = ${id}`;
    db.run(sql, [], (err) =>{
        if(err){
            throw err;
        } else {
            res.send('Funcionário deletado com sucesso!');
        }
    });
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
}