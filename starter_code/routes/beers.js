const express = require("express");
const router = new express.Router();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

router.get("/beers", (req, res) => {
    punkAPI.getBeers().then(apiRes => {
        res.render("beers", {
            beers: apiRes,
            css: ["beers"]
        })
    }).catch(apiErr => console.log(apiErr))
});

router.get("/random-beer", (req, res) => {
    punkAPI.getRandom().then(apiRes => {
        console.log(apiRes)
        res.render("randomBeer", {
            randomBeer: apiRes,
            css: ["randomBeer"]
        })
    }).catch(apiErr => console.log(apiErr))
});

module.exports = router;