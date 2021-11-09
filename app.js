const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

//CARGA INDEX
app.get('/', (req, res) => {
  res.render('index');
});
//CARGA BEERS
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log(beersFromApi);
      res.render('beers', { beersFromApi });
    })
    .catch(error => console.log(error));
});

//CARGA RANDOM BEER

app.get('/randomBeer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log(responseFromAPI);
      res.render('randomBeer', { responseFromAPI });
    })
    .catch(error => console.log(error));
});

app.get('/beers/beer-:id', (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then(beerFromApi => {
      res.render('beerClicked', { beerFromApi });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
