const express = require("express");
const hbs = require("hbs");
const router = new express.Router();
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

router.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
    .then(apiRes => {
      res.render("beers", { beers: apiRes });
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/random-beer", (req, res) => {
  punkAPI
    .getRandom()
    .then(apiRes => {
        console.log("hello", apiRes)
      res.render("random-beer", { randomBeer: apiRes[0] });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
