const express = require('express');

const hbs = require('hbs')
const path = require('path')
const PunkAPIWrapper = require('punkapi-javascript-wrapper')
const { resolve } = require('path')

const app = express()
const punkAPI = new PunkAPIWrapper()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/', (req, res) => {
  res.render('index')
});

app.get('/beers', (req, res) => {
  const beers = new PunkAPIWrapper()

  beers.getBeers()
    .then(beer => {
      res.render('beers', beer)
    })
    .catch(() => console.log(error))
})

app.get('/random-beers', (req, res) => {
  const beers = new PunkAPIWrapper()

  beers.getRandom()
    .then(responseFromAPI => {
      res.render('random-beers', responseFromAPI[0])
    })
    .catch(() => console.log(error))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'))
