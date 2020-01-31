const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Definir um esquema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nome: {
        type: String,
        trim: true,
        required: true,
    },
    usuario: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    nascimento:{
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    permissaoLevel: {
        type: Number,
        trim: true,
        required: true,
    },
    ativo:{
        type: Boolean,
        trim: true,
        required: true,
    },
    criado:{
        type: String,
        trim: true,
        required: true
    }
})

// hash a senha do usuário antes de salvar no banco de dados
UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
})

UserSchema.plugin(uniqueValidator, { message: '{PATH} já existe!' });


module.exports = mongoose.model('User', UserSchema);