const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

console.log(__dirname);

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  const beers = punkAPI
    .getBeers()
    .then(beers => {
      res.render('beers', { beers });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('An error occurred while fetching data.');
    });
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randombeer => {
      res.render('randombeer', { beers: randombeer });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('An error occurred while fetching data.');
    });
});

app.get('/beer-info/:beerId', (req, res) => {
  const beerId = req.params.beerId;

  punkAPI
    .getBeer(beerId)
    .then(beer => {
      res.render('beers-info', { beer });
      console.log(beer);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('An error occurred while fetching data.');
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
