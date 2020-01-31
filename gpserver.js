const express = require('express');
const logger = require('morgan');
const cors = require('cors')


const gps = require('./routes/gps');
const usuarios = require('./routes/users');

const bodyParser = require('body-parser');

//configuração do database
const mongoose = require('./config/database');
const jwt = require('jsonwebtoken');

const app = express();
//Token secreto JWT
app.set('chaveSecreta', 'Fel!x!986');

//conexão para o mongodb
mongoose.connection.on('error', console.error.bind(console, 'Erro de conexão do MongoDB:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.json({ "tutorial": "Construindo API REST com node.js" });
});

//rota pública
app.use('/usuarios', usuarios);

//rota privada
app.use('/gps', validarUsuario, gps);


app.get('/favicon.ico', (req, res) => {
    res.sendStatus(204);
})

function validarUsuario(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('chaveSecreta'), (err, decoded) => {
        if (err) {
            res.json({
                status: "error",
                message: err.message,
                data: null
            });
        } else {
            //adicione o ID do usuário para solicitar
            req.body.userId = decoded.id;
            next();
        }
    });
}


// express não considera 404 não encontrado como um erro, por isso precisamos lidar com 404 explicitamente
//lidar com erro 404
app.use((req, res, next) => {
    console.log("GPServer - Erros");
    let err = new Error('Não encontrado :(');
    err.status = 404;
    next(err);
});
//lidar com erros
app.use((err, req, res, next) => {
    var erro = {};
    if (err.status === 404)
        res.status(404).json({ message: "Não encontrado." })
    else {
        if (err) {
            if (err.name === 'ValidationError') {
                erro.status = 'Ops, não foi possível validar as informações.';
                if (err.errors.usuario) {
                    erro.usuario = err.errors.usuario.message;
                }
                if (err.errors.email) {
                    erro.email = err.errors.email.message
                }
            }
        }
        console.log(erro);
        res.status(500).json({ message: erro })
    }
})

app.listen(3000, function () {
    console.log('Servidor Node escutando na porta 3000.');
});