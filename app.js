const express = require('express');

const hbs = require('hbs');

const path = require('path');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')
hbs.registerPartials(`${__dirname}/views/partials`)

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
  
    .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi })
      beersFromAPI.forEach(elm => {
        punkAPI
          .getBeer(elm.id)
          .then(elm => res.render(`random-beer/beer-${elm.id}`, elm)) //no supe como
          .catch(error => console.log(error));
      })
    })

    .catch(error => console.log(error))
}) //No entendi ni este metodo punkAPI y me frustra mucho. Logre enviar las 25 beers al hbs por fallo y error poruqe no entendi nada.

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()

    .then(responseFromAPI => res.render('random-beer', {randomBeer: responseFromAPI}))

    .catch(error => console.log(error));
}) //No entendi ni este metodo punkAPI y me frustra mucho.

app.listen(3000, () => console.log('🏃‍ on port 3000'));