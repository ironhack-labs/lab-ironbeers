const express = require('express');

const router = express.Router();

const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const punkAPI = new PunkAPIWrapper();

router.get('/', (req, res) => {
  punkAPI.getBeers().then(beers => {
    res.render('beers', {
      title: 'IronHack Beers',
      beers
    })
  }).catch(error => {
    res.render('error', {
      title: 'Error',
      error
    })
  })
})


module.exports = router;