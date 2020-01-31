const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();


app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
    res.json({"tutorial": "Construindo API REST com node.js"});
});

app.listen(3000, function(){
    console.log('Servidor Node escutando na porta 3000');
});