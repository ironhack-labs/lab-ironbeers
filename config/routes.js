const express = require('express');
const indexController = require('../controllers/index.controller.js');
const beersController = require('../controllers/beers.controller.js');
const randomController = require('../controllers/random.controller.js');

const router = express.Router();

router.get('/', indexController.index);
router.get('/beers', beersController.beers);
router.get('/random', randomController.random);

module.exports = router;