const express = require("express");
const router = new express.Router();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


router.get("/random-beer", (req, res) => {
    punkAPI.getRandom()
        .then(beers => {
            res.render("randomBeer",
                { randomBeer: beers[0] });
        })
        .catch(error => {
            console.log(error)
        })
})



module.exports = router;