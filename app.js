const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersArray => {
      // console.log(beersArray);
      const data = { listOfBeers: beersArray };

      res.render('beers', data);
    })
    .catch(error => {
      console.log('sth is wrong with the beer ', error);
    });
});

app.get('/random-beer', (req, res) => {
  const randomBeer = punkAPI.getRandom();

  randomBeer
    .then(beer => {
      const data = beer[0];
      console.log(data);
      res.render('random-beer', data);
    })
    .catch(error => {
      console.log('Random beer is not here', error);
    });
});

app.get('/beers/:id', (req, res) => {
  const beerId = req.params.id;

  punkAPI
    .getBeer(beerId)
    .then(beer => {
      const data = beer[0];
      res.render('beer-details', data);
    })
    .catch(error => {
      console.log('Error fetching beer details', error);
    });
});

app.listen(3005, () => console.log('🏃‍ on port 3005'));
