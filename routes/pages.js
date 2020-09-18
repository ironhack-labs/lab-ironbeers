const express = require('express');
const router = new express.Router();

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/beers', async (req, res) => {
  try {
    const beer = await punkAPI.getBeers();
    res.render('beers', { beer });
  } catch (err) {
    error => console.log(error);
  }
});

router.get('/random-beers', async (req, res) => {
  try {
    const beer = await punkAPI.getRandom();
    res.render('random-beer', { beer });
  } catch (err) {
    error => console.log(error);
  }
});

router.get('/beers/beer-:id', async (req, res, next) => {
  try {
    const beer = await punkAPI.getBeer(req.params.id);

    console.log(beer);
    res.render('../views/partials/beer', {beer});
  } catch (err) {
    error => console.log(error);
  }
});

module.exports = router;
 