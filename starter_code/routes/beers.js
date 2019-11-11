const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();
const express = require("express");
const router = new express.Router();

console.log(punkAPI);

router.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
    .then(apiRes => {
      // console.log(apiRes);
      // res.json(apiRes);
      res.render("beers", { beers: apiRes });
    })
    .catch(apiErr => console.log(apiErr));
});

router.get("/random-beers", (req, res) => {
  punkAPI
    .getRandom()
    .then(beers => {
      res.render("random-beers", { beers: beers });
      console.log(beers);
    })
    .catch(error => {
      console.log(error);
    });
});
module.exports = router;
