const express = require("express");
const router = express.Router();

const home = require("../controllers/home.controller");
const beers = require("../controllers/beers.controller");
const randomBeer = require("../controllers/randomBeer.controller");
const detail = require("../controllers/detail.controller")


router.get("/", home.home);
router.get("/beers", beers.beers);
router.get("/randomBeer", randomBeer.randomBeer);
router.get('/beers/:id', detail.detail);

module.exports = router;