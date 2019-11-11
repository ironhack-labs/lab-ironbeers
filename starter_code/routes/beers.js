const express = require("express");
const router = new express.Router();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

router.get("/beers", (req, res) => {
    punkAPI.getBeers()
        .then(apiRes => {
            res.render("beers", {
                beers: apiRes
            });
            //res.json(apiRes); // send back the response as a JSON object
        })
        .catch(apiErr => console.log(apiErr));
});

router.get("/random-beers", (req, res) => {
    res.send("on the random beer route");
});

module.exports = router;