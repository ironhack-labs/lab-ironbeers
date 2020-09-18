const express = require('express');
const router = new express.Router();

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/beers', async (req, res) => {
  try {
    const beers = await punkAPI.getBeers();

    console.log(beers);
    res.render("beers", {beers})
  } catch (err) {
    error => console.log(error);
  }
});

module.exports = router;
