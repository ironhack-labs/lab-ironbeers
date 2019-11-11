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

router.get("/random-beers", (req, res) => {
    res.render('randomBeers')
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

module.exports = router;