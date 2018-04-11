
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(path.join(__dirname, 'public')));

// Botones
let btn = [
  {
    texto: "Check the Beers!",
    destino: ""
  },
  {
    texto: "Check a Random Beer",
    destino: ""
  }
]

// Rutas 
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {

  punkAPI.getBeers()
  .then(beers => {
    const data = { beers: beers }
    res.render('beers', data);
  })
  .catch(error => {
    console.log(error)
  })

  
});

app.get('/random-beers', (req, res) => {
  res.render('random-beers');
});

app.listen(3000);