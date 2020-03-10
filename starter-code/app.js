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
hbs.registerPartials(__dirname + '/views/partials');

// add the routes here:
app.get('/', (req, res) => res.render('index'));

// app.get('/beers', (req, res) => );
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersData => {
      console.log('Getting beers from the database:', beersData);
      res.render('beers', { beers: beersData });
    })
    .catch(error => console.log(error));
});

app.get('/random', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersData => {
      let theBeer = beersData.filter(beers => beers === req.params.beers)[0];
      res.render('random', { beers: theBeer });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
