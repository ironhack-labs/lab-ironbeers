const path = require("path");
const express = require("express");
const router = express.Router();
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();
router.get("/", (req, res, next) => {
    res.render("index");

});
router.get("/beers", (req, res, next) => {

    punkAPI.getBeers()
        .then(beers => {
            let allBeers = beers;
            console.log(allBeers);
            res.render('beers', {
                allBeers
            });
        })
        .catch(error => {
            console.log(error)
        })

});
router.get("/randombeers", (req, res, next) => {

    punkAPI.getRandom()
        .then(beer => {
            // let myBeer = beer;
            debugger
            res.render("randombeers", {
                myBeer: beer[0]
            });
        })
        .catch(error => {
            console.log(error)
        })


});
module.exports = router;