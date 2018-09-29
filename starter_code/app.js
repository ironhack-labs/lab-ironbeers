const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// REGISTRO PARTIALS
hbs.registerPartials(__dirname + "/views/partials/")

app.get('/', (req, res, next) => {
  res.render('index');
});

// BEERS
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render("beers", {
        beers
      }) //Se manda a la vista
      console.log({beers})
    })
    .catch(error => {
      console.log(error)
    })
})

// RANDOM BEERS
app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
    .then(beers => {
      res.render("random-beers", {
        beers
      }) //Se manda a la vista
    })
    .catch(error => {
      console.log(error)
    })
})

// Servidor en el puerto 3000
app.listen(3000);