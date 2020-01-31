// Dependencies
//var restful = require('node-restful');
//var mongoose = restful.mongoose;
const mongoose = require('mongoose');

// Schema
var GpsSchema = new mongoose.Schema({
    telefone: {
      type:String,
      trim: true,
      required: true
    },
    whatsapp: {
      type:String,
      trim: true,
      required: false
    },
    categoria: {
      type:String,
      trim: true,
      required: false
    },
    estado: {
      type:String,
      trim: true,
      required: false
    },
    cidade: {
      type:String,
      trim: true,
      required: false
    },
    nome: {
      type:String,
      trim: true,
      required: true
    },
    idade: {
      type:String,
      trim: true,
      required: false
    },
    titulo: {
      type:String,
      trim: true,
      required: false
    },
    texto: {
      type:String,
      trim: true,
      required: false
    },
    twitter: {
      type: String,
      trim: true,
      required: false
    },
    cache:  {
      type: Array<Array> String,
      required: false
    },
    horario:  {
      type:  Object<Array> String,
      required: false
    },
    mesmo_horario: {
      type: Boolean,
      required: false
    },
    sobre: {
      type: Array<String> String,
      required: false,
    },
    servicos:  {
      type: Array,
      required: false
    },
    etnia: {
      type:String,
      trim: true
    },
    oral: {
      type:String,
      trim: true,
      required: false
    },
    especiais: {
      type: Array,
      required: false
    },
    lugar: {
      type: Array,
      required: false
    },
    mapa:{
      type: Array,
      required: false
    },
    dataCadastro: {
      type: Date,
      trim: true,
      required: false
    },
    id: Number
  });

// Return model

//module.exports = restful.model('Gps', GpsSchema);
module.exports = mongoose.model('gps', GpsSchema);