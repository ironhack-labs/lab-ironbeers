const express = require("express");
const Beers = require("../controllers/beers-controller");
const { beers } = require("../controllers/beers-controller");
const router = express.Router();

router.get("/beers", Beers.beers);
router.get("/random-beer", Beers.randomBeer);

module.exports = router;
