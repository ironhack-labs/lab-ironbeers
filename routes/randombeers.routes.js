const express = require("express");

const { renderBeers } = require("../controllers/beers.controller");

const router = express.Router();

router.get("/", renderBeers);

module.exports = router;