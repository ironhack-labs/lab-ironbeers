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

router.get('/beer/:id', (req, res) => {
  punkAPI.getBeer(req.params.id).then(beer => {
    [beer] =  beer
    res.render('beer', {
      title: 'Beers',
      beer: beer
    })
  }).catch(error => {
    res.render('error', {
      title: 'Ups Error',
      error: error
    })
  })
})

router.get('/random-beer', (req, res) => {
  punkAPI.getRandom().then(beer => {
    [beer] =  beer   
    res.render('beer', {
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

router.get('/search', (req, res) => {
  punkAPI.getBeers().then(beers => {
    beers = beers.filter(beer => {
      return beer.name.includes(req.query.search) || beer.tagline.includes(req.query.search)
    })
    res.render('beers', {
      title: 'Beers',
      beers: beers,
      term: req.query.search
    })
  }).catch(error => {
    res.render('error', {
      title: 'Ups Error',
      error: error
    })
  })
})

module.exports = router