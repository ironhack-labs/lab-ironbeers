const express = require("express");
const router = new express.Router();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const beerPartial = require("./../views/partials/beerPartial");
const randomBeer = require("./../views/randomBeer");

router.get("/beers", (req, res) => {
    punkAPI.getBeers().then(apiRes => {
        res.render("beers", {beers: apiRes})
    }).catch(apiErr => console.log(apiErr))
});

router.get("/random-beer", (req, res) => {
    punkAPI
      .getRandom(req.params.id)
      .then(apiRes => {
        res.render("randomBeer", { beers: apiRes });
      })
      .catch(apiErr => console.log(apiErr));
});

router.get("/beers/:id", (req, res) => {
    punkAPI
      .getBeer(req.params.id)
      .then(apiRes => {
          console.log("id");
        res.render("partials/beerPartial", { beers: apiRes });
      })
      .catch(apiErr => console.log(apiErr));
  });

 

module.exports = router;