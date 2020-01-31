//configurar conexão mongoose
const mongoose = require('mongoose');
//const mongoDB = 'mongodb:localhost/api-gps';
const mongoDB = 'mongodb://localhost:27017/admin';
mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;