const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbPath = './database/yamaha.db';

const app = express();
const PORT = 3000;

const projectsRoutes = require('./routes/projects');
const employeesRoutes = require('./routes/employees');
const governanceRoutes = require('./routes/governance');
const roleRoutes = require('./routes/role');
const alocationRoutes = require('./routes/alocation');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use('/projects', projectsRoutes);
app.use('/employees', employeesRoutes);
app.use('/governance', governanceRoutes);
app.use('/role', roleRoutes);
app.use('/alocation', alocationRoutes);

 app.get('/alteraratt', (req, res) =>{
    const id = req.query["id"];
    const db = new sqlite3.Database(dbPath);
    const sql = `SELECT * FROM Alocacao INNER JOIN Funcionario ON Funcionario.FuncionarioID = Alocacao.FuncionarioID WHERE ProjetoID = ${id}`;
    db.all(sql, [], (err, rows) =>{
        if(err){
            throw err;
        } else {
            res.json(rows); 
        }
    });
});

app.get('/alterarprojeto', (req, res) =>{
    const id = req.query["id"];
    const db = new sqlite3.Database(dbPath);
    const sql = `SELECT * FROM Projeto INNER JOIN Governanca ON Governanca.GovernancaID = Projeto.GovernancaID WHERE ProjetoID = ${id}`;
    db.get(sql, [], (err, row) =>{
        if(err){
            throw err;
        } else {
            res.render('alterarprojeto', { projeto: row });
        }
    });
});

app.post('/updateproject', (req, res) =>{
    const db = new sqlite3.Database(dbPath);
    const id = req.body.id;
    const name = req.body.nome;
    const description = req.body.descricao;
    const city = req.body.governanca;
    const principalResponsible = req.body.responsavel;
    const beginDate = req.body.datainicial;
    const finalDate = req.body.datafinal;

    const sql = `UPDATE Projeto SET NomeProjeto = ?, Descricao = ?, PrincipalResponsavel = ?, DataInicial = ?, DataFinal = ?, GovernancaID = ? WHERE ProjetoID = ${id}`;

    db.run(sql, [name, description, principalResponsible, beginDate, finalDate, city], (err) =>{
        if(err){
            throw err;
        } else {
            res.redirect('back');
        }
    });
});


app.post('/updategov', (req, res) =>{
    const db = new sqlite3.Database(dbPath);
    const id = req.body.id;
    const govpais = req.body.govpais;
    const govest = req.body.govest;
    const govend = req.body.govend;

    const sql = `UPDATE Governanca SET Pais = ?, Estado = ?, Endereco = ? WHERE GovernancaID = ${id}`;

    db.run(sql, [govpais, govest, govend], (err) =>{
        if(err){
            throw err;
        } else {
            res.redirect('back');
        }
    });
});

app.post('/updatefunc', (req, res) =>{
    const db = new sqlite3.Database(dbPath);
    const id = req.body.id;
    const functitulo = req.body.functitulo;
    const funcarea = req.body.funcarea;

    const sql = `UPDATE Funcao SET Titulo = ?, Area = ? WHERE FuncaoID = ${id}`;

    db.run(sql, [functitulo, funcarea], (err) =>{
        if(err){
            throw err;
        } else {
            res.redirect('back');
        }
    });
});

app.post('/updatealloc', (req, res) =>{
    const db = new sqlite3.Database(dbPath);
    const idAloc = req.body.idaloc;
    const idProject = req.body.idproj;
    const idEmp = req.body.idfunc;
    const beginDate = req.body.inicial;
    const finalDate = req.body.final;
    const hrJan = req.body.hrjan;
    const hrFeb = req.body.hrfev;
    const hrMar = req.body.hrmar;
    const hrApr = req.body.hrabr;
    const hrMay = req.body.hrmai;
    const hrJun = req.body.hrjun;
    const hrJul = req.body.hrjul;
    const hrAug = req.body.hrago;
    const hrSep = req.body.hrset;
    const hrOct = req.body.hrout;
    const hrNov = req.body.hrnov;
    const hrDec = req.body.hrdez;

    const sql = `UPDATE Alocacao SET HorasJaneiro = ?, HorasFevereiro = ?, HorasMarco = ?, HorasAbril = ?, HorasMaio = ?, HorasJunho = ?, HorasJulho = ?, HorasAgosto = ?, HorasSetembro = ?, HorasOutubro = ?, HorasNovembro = ?, HorasDezembro = ?, DataInicialAlocacao = ?, DataFinalAlocacao = ?, ProjetoID = ?, FuncionarioID = ? WHERE AlocacaoID = ${idAloc}`;
    db.run(sql, [hrJan, hrFeb, hrMar, hrApr, hrMay, hrJun, hrJul, hrAug, hrSep, hrOct, hrNov, hrDec, beginDate, finalDate, idProject, idEmp], (err) =>{
        if(err){
            throw err;
        } else {
            res.redirect('home');
        }
    });
})

app.get('/alterarfuncionario', (req, res) =>{
    const id = req.query["id"];
    const db = new sqlite3.Database(dbPath);
    const sql = `SELECT * FROM Funcionario LEFT JOIN Governanca ON Governanca.GovernancaID = Funcionario.GovernancaID LEFT JOIN Funcao ON Funcao.FuncaoID = Funcionario.FuncaoID WHERE FuncionarioID = ${id}`;
    db.get(sql, [], (err, row) =>{
        if(err){
            throw err;
        } else {
            console.log(row);
            res.render('alterarfuncionario', { funcionario: row });
        }
    });
});

app.get('/alterarfunc', (req, res) =>{
    const id = req.query["id"];
    const db = new sqlite3.Database(dbPath);
    const sql = `SELECT * FROM Funcao WHERE FuncaoID = ${id}`;
    db.get(sql, [], (err, row) =>{
        if(err){
            throw err;
        } else {
            console.log(row);
            res.render('alterarfunc', { funcao: row });
        }
    });
});

app.get('/alterargov', (req, res) =>{
    const id = req.query["id"];
    const db = new sqlite3.Database(dbPath);
    const sql = `SELECT * FROM Governanca WHERE GovernancaID = ${id}`;
    db.get(sql, [], (err, row) =>{
        if(err){
            throw err;
        } else {
            res.render(`alterargov`, { gov: row });
        }
    });
});

app.post('/updateemployee', (req, res) =>{
    const db = new sqlite3.Database(dbPath);
    const id = req.body.id;
    const firstName = req.body.nome;
    const lastName = req.body.sobrenome;
    const funcYamaha = req.body.btnradio;
    const register = req.body.registro;
    const governace = req.body.governanca;
    const company = req.body.empresa;
    const durationContract = req.body.duracaocontrato;
    const hoursProject = req.body.jornadaTrabalho;
    const functionID = req.body.funcaoID;

    const sql = `UPDATE Funcionario SET Nome = ?, Sobrenome = ?, FuncionarioYamaha = ?, Registro = ?, Empresa = ?, DuracaoContrato = ?, HorasProjetos = ?, GovernancaID = ?, FuncaoID = ? WHERE FuncionarioID = ${id}`;
    db.run(sql, [firstName, lastName, funcYamaha, register, company, durationContract, hoursProject, governace, functionID], (err) =>{
        if(err){
            throw err;
        } else {
            res.redirect('back');
        }
    });
});

app.post('/deleteatt', (req, res) =>{
    const db = new sqlite3.Database(dbPath);
    const id = req.body.alocacao;
    const sql = `DELETE FROM Alocacao WHERE AlocacaoID = ${id}`;
    db.run(sql, [], (err) =>{
        if(err){
            throw err;
        } else {
            res.send();
        }
    });
});

app.post('/deleteproject', (req, res) =>{
    const db = new sqlite3.Database(dbPath);
    const id = req.body.id;
    const sql = `DELETE FROM Projeto WHERE ProjetoID = ${id}`;
    db.run(sql, [], (err) =>{
        if(err){
            throw err;
        } else {
            res.send();
        }
    });
});

app.post('/deleteemployee', (req, res) =>{
    const db = new sqlite3.Database(dbPath);
    const id = req.body.id;
    const sql = `DELETE FROM Funcionario WHERE FuncionarioID = ${id}`;
    db.run(sql, [], (err) =>{
        if(err){
            throw err;
        } else {
            res.send();
        }
    });
});

app.post('/deletefunc', (req, res) =>{
    const db = new sqlite3.Database(dbPath);
    const id = req.body.id;
    const sql = `DELETE FROM Funcao WHERE FuncaoID = ${id}`;
    db.run(sql, [], (err) =>{
        if(err){
            throw err;
        } else {
            res.send();
        }
    });
});

app.post('/deletegov', (req, res) =>{
    const db = new sqlite3.Database(dbPath);
    const id = req.body.id;
    const sql = `DELETE FROM Governanca WHERE GovernancaID = ${id}`;
    db.run(sql, [], (err) =>{
        if(err){
            throw err;
        } else {
            res.send();
        }
    });
});

app.get('/atribuir', (req, res) =>{
    res.render('atribuir');
});

app.get('/graficos', (req, res) =>{
    res.render('graficos');
});

app.get('/home', (req, res) =>{
    res.render('home');
});

app.get('/', (req, res) =>{
    res.render('index');
});

app.get('/novaFuncao', (req, res) =>{
    res.render('novaFuncao');
});

app.get('/novaGovernanca', (req, res) =>{
    res.render('novaGovernanca');
});

app.get('/novo', (req, res) =>{
    res.render('novo');
});

app.get('/novoFuncionario', (req, res) =>{
    res.render('novoFuncionario');
});

app.get('/novoProjeto', (req, res) =>{
    res.render('novoProjeto');
});

app.get('/tabelaFuncionarios', (req, res) =>{
    res.render('tabelaFuncionarios');
});

app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});