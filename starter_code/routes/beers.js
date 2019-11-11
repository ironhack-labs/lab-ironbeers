const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const express = require('express');
const router  = express.Router();

router.get("/beers", (req,res) => {
    punkAPI.getBeers().then(apiRes => {
        // console.log(apiRes)
        res.render("beers", {beers: apiRes})
    }).catch(apiErr => console.log(apiErr))
})

router.get("/random_beer", (req,res) => {
    punkAPI.getRandom().then(apiRes => {
        console.log(Array.isArray(apiRes))
        res.render("random_beer", {beer: apiRes[0]})
    }).catch(apiErr => console.log(apiErr))
})

module.exports = router;
