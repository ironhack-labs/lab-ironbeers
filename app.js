
// 1. Importaciones.

const { response } = require('express');
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const app = express();
require ("dotenv").config()
const punkAPI = new PunkAPIWrapper();

// 2. Middlewares.
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Partials.
hbs.registerPartials(__dirname + "/views/partials")

// 3. Rutas.

// Index.
app.get('/', (req, res) => {
  res.render('index');
});

// Beers.
app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beers => 
  res.render('beers', {beers})
  )
  .catch(error => console.log(error));
});

// Random-beer
app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(beer =>
    res.render('random-beer', {beer})
    )
  .catch(error => console.log(error));
});

//4. Servidor.
app.listen(3000, () => console.log('🏃‍ on port 3000'));
