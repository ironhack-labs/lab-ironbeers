const express = require('express');

const hbs = require('hbs');
const path = require('path');
const cors = require("cors")
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get("/beers", (req, res, next) => {
    punkAPI.getBeers().then(beers => console.log('beers', {
      beers
    })).catch(error => console.log(error));

  }
  res.render("beers.hbs"))

app.get('/random-beers', (req, res) => {
  punkAPI.getRandom().then(randomBeer => res.render("random-beers", {
    randomBeer
  })).catch(error => console.log(error));

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));