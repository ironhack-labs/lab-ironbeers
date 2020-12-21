const express = require('express');
const commonController = require('../controllers/common.controller');

const router = express.Router();

router.get('/', commonController.index);
router.get('/beers', commonController.beers);
router.get('/random-beers', commonController.randombeers);

module.exports = router;