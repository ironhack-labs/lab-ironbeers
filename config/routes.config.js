const express = require("express");
const beers = require("../controllers/beers.controller");
const router = express.Router();

router.get("/beers", beers.list);
router.get("/random-beer", beers.randomBeer);


module.exports = router;