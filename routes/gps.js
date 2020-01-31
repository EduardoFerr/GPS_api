const express = require('express');
const router = express.Router();
const gpsController = require('../app/api/controllers/gps');

router.get('/', gpsController.getAll);
router.post('/', gpsController.create);
router.get('/:gpsId', gpsController.getById);
router.put('/:gpsId', gpsController.updateById);
router.delete('/:gpsId', gpsController.deleteById);

module.exports = router;