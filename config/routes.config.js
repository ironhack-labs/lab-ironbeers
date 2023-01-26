const express = require('express');
const router = express.Router();
const beers = require('../controllers/beer.controller');


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/beers/:id', beers.specific);
router.get('/beers', beers.list);
router.get('/random-beer', beers.random);

module.exports = router;