const express = require("express");
const router = new express.Router();
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();



router.get("/beers", (req, res) => {
  punkAPI
  .getBeers()
  .then(apiRes => {
    //console.log(apiRes);
    // res.send(apiRes)
    res.render("beers",{beers: apiRes});
  })
  .catch(apiErr=>console.log(apiErr));
});

router.get("/random-beer", (req, res) => {
    punkAPI.getRandom()
    .then(apiRes=>{
        console.log(apiRes)
        res.render("randomBeer",{beer: apiRes[0]})
    })
    .catch(apiErr=>{
        console.log(apiErr)
    })
});

module.exports = router;
