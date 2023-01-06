const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      beers.splice(25);
      console.log('Beers from the database: ', { beers: beers });
      res.render('beers', { beers });
    })
    .catch(err => console.log(err));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beer => {
      console.log({ beer });
      if (!beer[0].image_url) beer[0].image_url = './images/beer.png';
      res.render('beer_detail', { beer: beer[0] });
    })
    .catch(err => console.log(err));
});

app.get('/beer/:beer_id', (req, res) => {
  punkAPI
    .getBeer(req.params.beer_id)
    .then(beer => {
      console.log({ beer });
      if (!beer[0].image_url) beer[0].image_url = './images/beer.png';
      res.render('beer_detail', { beer: beer[0], goback: true });
      // res.send(beers);
    })
    .catch(err => console.log(err));
});

app.listen(3200, () => console.log('🏃‍ on port 3200'));
