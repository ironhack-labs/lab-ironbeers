const express = require("express");
const path = require("path");
const router = express.Router();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

router.get('/', (req, res) => {
    res.render(path.resolve(__dirname, "../views/index.hbs"));
});

router.get('/beers', async (req, res) => {
    const arrBeers = await punkAPI.getBeers();
    res.render(path.resolve(__dirname, "../views/beers.hbs"), {
        arrBeers
    });
    console.log(arrBeers)
});

router.get('/random-beers', async (req, res) => {
    const randomBeers = await punkAPI.getRandom();
    res.render(path.resolve(__dirname, "../views/random-beers.hbs"), {
    ...randomBeers[0]
    });
});

module.exports = router;