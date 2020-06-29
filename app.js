const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials/');


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  const beers = punkAPI.getBeers();
  beers.then(beersFromApi => {
    res.render('beers', {beersFromApi});
});
  beers.catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {
  const randBeer = punkAPI.getRandom();
  randBeer.then(rB => res.render('beer-info', rB[0]));
  randBeer.catch(error => console.log(error));
});

app.get('/beer-info/:id', (req, res) => {
  const beer = punkAPI.getBeer(req.params.id);
  console.log(beer)
  beer.then(b => res.render('beer-info', b[0]));
  beer.catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
