const express = require('express')

const hbs = require('hbs')
const path = require('path')
const PunkAPIWrapper = require('punkapi-javascript-wrapper')

const app = express()
const punkAPI = new PunkAPIWrapper()
const PORT = 5005

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

// Partials
hbs.registerPartials(`${__dirname}/views/partials`)

// Routes
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      // console.log('Beers from the database: ', beersFromApi)
      res.render('beers', { beersFromApi })
    })
    .catch(error => console.log(error))
})

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomFromAPI => {
      res.render('random-beers', { randomFromAPI })
    })
    .catch(error => console.log(error));
})

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      // console.log('Beers from the database: ', beersFromApi)
      res.render('beers', { beersFromApi })
    })
    .catch(error => console.log(error))
})

// Routing
app.listen(PORT, () => console.log('running‍ on port 5005'))
