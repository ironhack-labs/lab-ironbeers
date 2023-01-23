const express = require('express');
const router = express.Router(); 

const homeController = require('../controllers/home.controller');
const beersController = require('../controllers/beers.controller');
const randomBeerController = require('../controllers/random.controller');
const detailController = require('../controllers/detail.controller');

router.get('/', homeController.home);
router.get('/beers', beersController.beers);
router.get('/random-beer', randomBeerController.random);
router.get('/beers/:id', detailController.detail);

module.exports = router; 
