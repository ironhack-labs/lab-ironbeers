const express = require('express');
const beersController = require('../controllers/beers.controller.js');
const randomController = require('../controllers/random.controller.js');

const router = express.Router();

router.get('/beers', beersController.beers);
router.get('/random', randomController.random);

// const home = (req, res, next) => {
//     res.sendFile(__dirname + '/views/index.hbs');
// }

// app.get('/beers', beers);
// app.get('/beers', beers);
// app.get('/randombeers', randomBeers);

module.exports = router;