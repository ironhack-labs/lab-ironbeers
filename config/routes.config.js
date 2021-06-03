const express = require('express');
const router = express.Router();//hay un router dentro de espress
const common = require('../controller/common.controller');//traemos fichero de common.controller


// Aqui definimos todas las rutas que tenemos de la web
router.get('/', common.home)

//exportamos el router que lo require el app.js

module.exports = router;