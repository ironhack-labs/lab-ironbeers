const express = require("express")
const router = new express.Router()
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

router.get("/", (req, res, next) => {
  res.render("index");
});


router.get("/beers", (req, res) => {
  punkAPI.getBeers()
    .then((beersFromApi) => {
      const beers = beersFromApi
      res.render("beers.hbs", {
        beers: beers,
      })
    })
    .catch((apiErr) => {
      console.log(apiErr);
    });
});

router.get('/beer/:id', (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then((beerFromApi) => {
      console.log(beerFromApi);
      res.render('oneBeer', {
        beers: beerFromApi[0]
      });
    })
    .catch((error) => console.log(error));
});

router.get("/random-beers", (req, res, next) => {
  punkAPI.getRandom()
    .then((beersFromApi) => {
      res.render("randomBeers", {
        beers: beersFromApi[0]
      })
    })
    .catch((apiErr) => {
      console.log(apiErr);
    });
});


module.exports = router;