const express = require('express');
const router = express.Router();
const beers = require('../controllers/beers.controller');

router.get('/beers', beers.beersls);
router.get('/random', beers.random);

module.exports = router;