const express = require('express');
const { beers, beerId, randomBeer, index } = require('../controllers')

const router = express.Router();

router.get("/", index.index);
router.get("/beers", beers.beer);
router.get("/beers/:beerId", beerId.beerId);
router.get("/random-beer", randomBeer.randomBeer);

module.exports = router;