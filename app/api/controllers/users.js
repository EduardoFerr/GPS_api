const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function(req, res, next){
        userModel.create({
            nome: req.body.nome,
            usuario: req.body.usuario,
            nascimento: req.body.nascimento,
            email: req.body.email,
            password: req.body.password,
            permissaoLevel: 1,
            ativo: true,
            criado: new Date().toISOString()
        },
        function(err, result){
            if(err)
                next(err);
            else
                res.json({
                    status: "success",
                    message: "Usuário adicionado com sucesso!",
                    data: null
                })
        })
    },

    authenticate: function(req, res, next){
        userModel.findOne({email: req.body.email}, function(err, userInfo){
            console.log('************************');
            Date.prototype.addHours = function(h) {
                this.setTime(this.getTime() + (h*60*60*1000));
                return this;
            }
            console.log(err)
            if(err){
                console.log(err);
                next(err);
            }else{
                console.log('-------------------------');
                console.log(req.body);
                console.log('-------------------------');
                console.log('DATA NOW');
                console.log(Date.now());
                if(bcrypt.compareSync(req.body.password, userInfo.password)){
                    const token = jwt.sign({id: userInfo._id}, req.app.get('chaveSecreta'), { expiresIn: '1h'});
                    res.json({
                        status: "success", message: "Usuario encontrado!", data: {
                            usuario: userInfo.usuario,
                            nascimento: userInfo.nascimento,
                            criado: userInfo.criado,
                            token: token,
                            expiresIn: token.expiresIn
                        }
                    });
                }else{
                    res.json({status: "error", message: "Email/password invalido!", data: null})
                }
            }
        });
    },

    perfil: (req, res, next) => {
        console.log(req.body);
        userModel.findById(req.params.userId, (err, userInfo) => {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "Perfil encontrado!",
                    data: { user: userInfo }
                })
            }
        })
    },


};