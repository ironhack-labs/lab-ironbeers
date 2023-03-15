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
  const data = {
    image: "beer.png",
    cta: [
      {
        text: 'Check the Beers!',
        target: '/beers'
      },
      {
        text: 'Check a Random Beer',
        target: '/random-beer'
      }
    ]

  };
  res.render('index', data);
});

app.get('/beers', (req, res) => {
  let data = {};
  punkAPI.getBeers()
    .then(beersFromApi => {
      data = {
        beers: beersFromApi
      }
      res.render('beers', data);
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  let data = {};
  punkAPI.getRandom()
    .then(randomBeer => {
      // your magic happens here
      data = {
        beers: randomBeer
      }
      res.render('random-beer', data.beers[0]);
    })
    .catch(error => console.log(error));
});


app.get('/beers/beer/:beerId', (req, res) => {

  console.log(req.params.beerId)
  punkAPI.getBeer(req.params.beerId)
  .then(beersFromApi => {
    data = {
      beers: beersFromApi
    }
    console.log(data)
    res.render('beerUnique', data.beers[0]);
  })
  .catch(error => console.log(error));
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
