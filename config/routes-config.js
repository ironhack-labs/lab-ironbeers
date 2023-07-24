const express = require("express");
const Beers = require("../controllers/beers-controller");
const router = express.Router();

router.get("/", Beers.home)
router.get("/beers", Beers.list);
router.get("/randomBeer", Beers.randomBeer);

module.exports = router;
