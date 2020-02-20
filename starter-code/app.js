const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

hbs.registerPartials(__dirname + "/views/partials");

// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      //const beers = punkAPI.getBeers({ 'abv_gt': 25 })
      res.render('beers/beers', { beersFromApi })
    })
    .catch(error => console.log(error));
})
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('beers/randombeer', { responseFromAPI })
    })
    .catch(error => console.log(error));
})
app.get('/beers/beer-:id', (req, res) => {
  const { id } = req.params;
  punkAPI.getBeer(id)
    .then(beer => {
      res.render('beers/beer', { beer })
    })
    .catch(error => console.log(error));
})

app.listen(2000, () => console.log('start on port 2000'));
