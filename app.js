const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// This line goes before the app.set rules
hbs.registerPartials(__dirname + "/views/partials");

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => { res.render('index') });

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then((response) => {
    let beers = response.slice(0, 25)
    res.render('beers', {beers})})
  .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then((response) => {
    randBeer = response[0]
    console.log(randBeer)
    res.render('randomBeer', {randBeer})})
  .catch(error => console.log(error));
  })


app.listen(3000, () => console.log('🏃‍ on port 3000'));
