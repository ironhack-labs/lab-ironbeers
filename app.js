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

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then((result) => {
      const beersArr = result;
      console.log(result);
      res.render("beers", beersArr)
    })
    .catch(error => { console.error("oopsie retrieving beers") })
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then((result) => {
      const randomBeer = result;
      //console.log(result)
      res.render("randomBeer", randomBeer)
    })
    .catch(error => { console.error("oopsie retrieving the random beer") })
});

app.get('/beers/beer-:beer', (req, res) => {
  let id = req.params.beer;
  punkAPI.getBeer(id)
    .then((result) => {
      const randomBeer = result;
      res.render("randomBeer", randomBeer)
    })
    .catch(error => { console.error("oopsie retrieving the random beer") })
});



