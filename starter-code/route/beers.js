const express = require('express');
const router = new express.Router();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

router.get("/beers", (req, res, next) => {
    punkAPI
        .getBeers()
        .then(dbRes => {
            console.log("ici =>", dbRes)
            res.render("beers", {
                beers: dbRes
            });
        })
        .catch(err => console.log(err));
});

module.exports = router;