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

// add the routes here:
app.get('/', (req, res) => res.render('index'));

// app.get('/beers', (req, res) => res.render('beers'));

app.get('/beers', (req, res) => {
  console.log("it's ok");
  let birra = punkAPI.getBeers(req.query);
  birra
    .then(apiRes => {
      //   res.json(beers);
      console.log(apiRes);
      res.render('beers.hbs', { birra: apiRes });
    })
    .catch(err => console.log(err));
});

app.get('/random-beer', (req, res) => {
  const randomBeer = punkAPI.getRandom();
  randomBeer
    .then(beer => {
      const birraRandom = beer[0].name;
      console.log(birraRandom);
      res.render('random-beer', { beer });
    })
    .catch(err => console.log(err));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
