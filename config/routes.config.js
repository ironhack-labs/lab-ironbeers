const express = require("express");
const index = require("../controllers/index.controller")
const beers = require("../controllers/beers.controller")
const beersRandom = require("../controllers/beers.random.controller")
const router = express.Router();

router.get("/", index)
router.get("/beers", beers);
router.get("/random-beer", beersRandom);

module.exports = router;