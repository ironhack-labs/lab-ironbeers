const express = require('express');
const router = express.Router();
const misc = require('../controllers/misc.controller');
const beers = require('../controllers/beers.controller');

router.get('/', misc.home);

router.get('/beers', beers.list);

module.exports = router;