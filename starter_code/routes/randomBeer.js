const express = require("express");
const router = new express.Router();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

router.get("/random-beers", (req, res) => {
    punkAPI.getRandom()
        .then(apiRes => {
            res.render("randomBeer", {
                randomBeers: apiRes[0]
            });
            //res.json(apiRes); // send back the response as a JSON object
            console.log("inside randomBeers.js promise");
        })
        .catch(apiErr => console.log(apiErr));
});

module.exports = router;