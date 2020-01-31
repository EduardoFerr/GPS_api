const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');


router.post('/registrar', userController.create);
router.post('/autenticar', userController.authenticate);
router.get('/perfil', userController.perfil)

module.exports = router;