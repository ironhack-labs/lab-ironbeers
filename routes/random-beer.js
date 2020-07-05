const path = require('path');
const express = require('express');

const router = express.Router();

const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const punkAPI = new PunkAPIWrapper();


router.get('/', (req, res) => {
  punkAPI.getRandom().then(beer => {
    res.render('random-beer', {
      title: 'IronHack Random Beer',
      beer: beer[0]
    })
    // console.log(beer);
  }).catch(error => {
    res.render('error', {
      title: 'Error',
      error
    })
  })


});

module.exports = router;