const express = require('express');
const router = express.Router();//hay un router dentro de espress
const common = require('../controller/common.controller');//traemos fichero de common.controller
const beers = require('../controller/beers.controller');//traemos el fichero beers.controller

// Aqui definimos todas las rutas que tenemos de la web
router.get('/', common.home);
router.get('/beers', beers.list);
router.get('/beers/rand', beers.random);
router.get('/beers/:id', beers.get);

//exportamos el router que lo require el app.js
module.exports = router;