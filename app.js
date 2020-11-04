const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const app = express();
const punkAPI = new PunkAPIWrapper();

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + "/views/partials");

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  const allBeers = punkAPI.getBeers().then(beersFromApi =>
    console.log(beersFromApi)).catch(error => console.log(error))
  res.render('beers', allBeers);
});

app.get('/random-beer', (req, res) => {
  const randomBeer = punkAPI.getRandom().then(randomBeer => console.log(randomBeer)).catch(error => console.log(error))
  res.render('random-beer', randomBeer);
});

app.listen(3000);

module.exports = app;