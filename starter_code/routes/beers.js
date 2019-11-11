const express = require("express");
const router = new express.Router();

const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

router.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render("beers", { beers: beers, css: ["beers"] });
    })
    .catch(err => console.log(err));
});
router.get("/random-beer", (req, res) => {
  punkAPI
    .getRandom()
    .then(beer => {
      console.log(beer);
      res.render("randomBeer", { beer: beer[0] });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
