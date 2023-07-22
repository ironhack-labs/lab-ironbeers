const express = require('express');
const router = express.Router();

const homes = require('../controllers/home.controller');
router.get("/", homes.home);

const beers = require('../controllers/beers.controller');
router.get("/beers", beers.beer);

const randoms = require('../controllers/random.controller');
router.get("/random-beer", randoms.random);

module.exports = router;
