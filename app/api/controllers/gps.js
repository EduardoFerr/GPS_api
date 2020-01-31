const gpsModel = require('../models/gps');

module.exports = {
    getById: (req, res, next) => {
        console.log(req.body);
        gpsModel.findById(req.params.gpsId, (err, gpsInfo) => {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: "success",
                    message: "GPS encontrada!",
                    data: { gps: gpsInfo }
                })
            }
        })
    },

    getAll: (req, res, next) => {
        let gpsList = [];
        gpsModel.find({}, (err, gps) => {
            if (err) {
                next(err);
            } else {
                for(let gp of gps){
                    gpsList.push({
                        id: gp._id,
                        telefone: gp.telefone,
                        nome: gp.nome,
                        dataCadastro: gp.dataCadastro
                    });
                }
                res.json({
                    status: "success",
                    message: "Lista de GPS encontrada!",
                    data: {list: gpsList}
                })
            }
        })
    },

    updateById: (req, res, next) => {
        gpsModel.findByIdAndUpdate(req.params.gpsId, req.body, (err, gpsInfo) =>{
            if(err)
                next(err);
            else{
                res.json({
                    status: "success",
                    message: "GPS atualisado com sucesso!",
                    data: {gps: gpsInfo}
                })
            }
        })
    },
    
    deleteById: (req, res, next) => {
        gpsModel.findByIdAndRemove(req.params.gpsId, {nome:req.body.nome}, (err, gpsInfo) =>{
            if(err)
                next(err);
            else{
                res.json({
                    status: "success",
                    message: "GPS remnovido com sucesso!",
                    data: {gps: gpsInfo}
                })
            }
        })
    },


    create: (req, res, next) => {
        gpsModel.create({ nome: req.body.nome, telefone: req.body.telefone, dataCadastro: new Date() }, (err, gpsInfo) => {
            if (err)
                next(err);
            else
                res.json({
                    status: "success",
                    message: "GPS adicionada com sucesso!",
                    data: {gps: gpsInfo}
                });
        });
    },

}