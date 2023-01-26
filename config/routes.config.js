const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home.controller');
router.get('/', homeController.home)


const beersController = require('../controllers/beers.controller');
router.get('/beers', beersController.beers);

const randomBeerController = require('../controllers/randomBeerController')
router.get('/random-beer', randomBeerController.randomBeer);

const beerController = require('../controllers/beerController');
router.get('/beers/:id', beerController.beer);

module.exports = router;