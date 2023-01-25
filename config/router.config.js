const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home.controller');
const beersController = require('../controllers/beers.controller');
const randomBeerController = require('../controllers/randomBeer.controller');
const beerDetailController = require('../controllers/beerDetail.controller');

router.get('/', homeController.home);
router.get('/beers', beersController.beers);
router.get('/random-beer', randomBeerController.randomBeer);
router.get('/beers/:id', beerDetailController.beerDetail);

module.exports = router;
