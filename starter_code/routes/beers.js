const express = require("express");
const router = new express.Router();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


router.get("/", (req, res) => {
    res.render('index', {
        image: './images/beer.png',
        css: ['homeStyle']
    })
})

router.get("/beers", (req, res) => {
    punkAPI.getBeers().then(apiRes => {
            res.render("beers", {
                beers: apiRes,
                css: ['beersStyle']
            })
        })
        .catch(dbErr => console.log(dbErr))
});

router.get("/random-beers", (req, res) => {
    punkAPI.getRandom().then(apiRes => {
            res.render('randomBeers', {
                beer: apiRes[0],
                css: ['beersStyle']
            })
        })
        .catch(apiErr => console.log(apiErr))
})

module.exports = router;