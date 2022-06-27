const express = require("express");
const router = express.Router();

const beers = require('../controllers/beers.controller')

router.get('/', (req, res) => {
    res.redirect('index');
});

router.get('/index', beers.index);
router.get('/beers', beers.list);
router.get('/random-beer', beers.random);
router.get('/beers/beer-:id', beers.beer);

module.exports = router;