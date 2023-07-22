const express = require("express");
const index = require("../controllers/index.controller")
const beers = require("../controllers/beers.controller")
const beersRandom = require("../controllers/beers.random.controller")
const router = express.Router();

router.get("/", index.home)
router.get("/beers", beers.getBeers);
router.get("/random-beer", beersRandom.getRandom);
router.get("/beer/:id", beersRandom.getId)

module.exports = router;