const express = require('express');

const router = express.Router();

const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const punkAPI = new PunkAPIWrapper();

router.get('/', (req, res) => {
  punkAPI.getBeers().then(beers => {
    res.render('beers', {
      title: 'IronHack Beers',
      path: '/beers',
      beers
    })
  }).catch(error => {
    res.render('error', {
      title: 'Error',
      error
    })
  })
})

router.get('/beer/:id', (req, res) => {
  punkAPI.getBeer(req.params.id).then(beer => {
    console.log(beer[0]);
    res.render('random-beer', {
      title: 'Selected Beeer Detail',
      beer: beer[0]
    })
  }).catch(error => {
    res.render('error', {
      title: 'Error',
      error
    })
  })
})


module.exports = router;