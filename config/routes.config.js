const express = require('express');

const common = require('../controllers/common.controller');

// Iteration 3: import tweets controller
const router = express.Router();

router.get('/', common.home);
router.get('/beers', common.beers);
router.get('/random', common.random);

module.exports = router;
