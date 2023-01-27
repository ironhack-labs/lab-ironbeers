const express = require("express");
const router = express.Router();

const home = require("../controllers/home.controller")
const beers = require("../controllers/beers.controller")

router.get("/", home.home);
router.get('/list', beers.list);
router.get('/random-beer', beers.randomDetail);
router.get('/beers/:id', beers.detail);

module.exports = router;