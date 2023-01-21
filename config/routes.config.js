const express = require("express");
const router = express.Router();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const home = require("../controllers/home.controller");
const beers = require("../controllers/beers.controller");

router.get("/", home.home);
router.get("/beers", beers.beers);
router.get("/random-beer", beers.randomBeer)

module.exports = router;