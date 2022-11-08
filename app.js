const express = require('express');
const res = require('express/lib/response');

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
})

app.get('/beers', (req, res) => {
  //console.log('SOY UNA BEER')
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      //console.log('RENDERIZO')
      res.render('beers-page', { beersInfo: beersFromApi })
    })
})

app.get('/random-beer', (req, res) => {

  punkAPI.getRandom()
    .then(responseFromAPI => {
      //console.log('RANDONEO')
      res.render('random-beer', responseFromAPI[0])
    })
})

app.listen(5005, () => console.log('🏃‍ on port 5005'));



