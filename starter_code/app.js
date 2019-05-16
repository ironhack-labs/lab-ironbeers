const express = require('express')
const hbs = require('hbs')
const app = express()
const path = require('path')
const PunkAPIWrapper = require('punkapi-javascript-wrapper')
const punkAPI = new PunkAPIWrapper()
const port = 3000

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
app.use(express.static(path.join(__dirname, 'public')))


// Registro directorio partials
hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req, res, next) => {
  res.render('index')
})

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', { beers })
    })
    .catch(error => {
      console.log(error)
    })
})

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => {
      console.log(beers)
      res.render('beers', { beers })
    })
    .catch(error => {
      console.log(error)
    })
})

// Abrir servidor
app.listen(port, () => {
  console.log(`Esta escuchando en el puerto ${port}`)
})