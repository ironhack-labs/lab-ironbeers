const express = require("express");

const { renderBeers } = require("../controllers/beers.controllers");

const router = express.Router();

router.get("/", renderBeers);

module.exports = router;