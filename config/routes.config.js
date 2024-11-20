const express = require('express');
const router = express.Router();
const beers = require('../controllers/beers.controller');

router.get("/", beers.home);
router.get("/beers", beers.list);
router.get("/random-beer", beers.random);

module.exports = router;
