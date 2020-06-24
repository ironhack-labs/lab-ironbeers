const express = require('express')
const router = express.Router()
const PunkAPIWrapper = require('punkapi-javascript-wrapper')

const punkAPI = new PunkAPIWrapper()

// middleware that is specific to this router
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Home'
  })
})

router.get('/beers', (req, res) => {
  punkAPI.getBeers().then(beers => {
    res.render('beers', {
      title: 'Beers',
      beers: beers
    })
  }).catch(error => {
    res.render('error', {
      title: 'Ups Error',
      error: error
    })
  })
})

router.get('/random-beer', (req, res) => {
  punkAPI.getRandom().then(randomBeer => {
    [beer] =  randomBeer   
    res.render('random-beer', {
      title: 'Ramdom Beer',
      beer: beer
    })
  }).catch(error => {
    res.render('error', {
      title: 'Ups Error',
      error: error
    })
  })
})

module.exports = router