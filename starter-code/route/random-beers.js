const express = require('express');
const router = new express.Router();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

router.get("/random-beers", (req, res, next) => {
    const randomBeer = punkAPI.getRandom()
    randomBeer.then(beer => {
        res.render("random-beers", { beer: beer[0]})
    });
});

module.exports = router;