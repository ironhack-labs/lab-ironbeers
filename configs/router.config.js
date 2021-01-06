const express = require('express');
const common = require('../controllers/common.controller');

const router = express.Router();

//declarar las rutas (GEt quiero info)

router.get('/', common.home)
router.get('/beers', common.beers)
router.get('/random-beer', common.randomBeer)

module.exports = router;