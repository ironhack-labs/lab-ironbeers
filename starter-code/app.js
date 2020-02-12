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
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
  const beerList = punkAPI
    .getBeers()
    .then(beerList => {
      console.log('Beers from the database: ', beerList);

      res.render('beers', { beerList });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  const randomBeer = punkAPI
    .getRandom()
    .then(randomBeer => {
      console.log(randomBeer);
      const data = randomBeer[0];
      res.render('random-beer', data);
    })
    .catch(error => console.log(error));
});

app.get('/beers/:beerid', (req, res) => {
  const beerId = req.params.beerid;

  const specificBeer = punkAPI

    .getBeer(beerId)
    .then(specificBeer => {
      console.log(specificBeer);
      const data = specificBeer[0];
      res.render('beers', data);
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
