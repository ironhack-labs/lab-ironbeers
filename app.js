const express = require('express');
const {handlebars} = require('hbs');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));

// Register the location for handlebars partials here:
// hbs.registerPartials(path.join(__dirname + "/views/partials"));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

// route for /beers
app.get("/beers", (req, res, next) => {
  punkAPI.getBeers().then(beersFromApi => {
    res.render("beers.hbs", {beers: beersFromApi})
  })
  .catch(error => console.log(error))
})

// route for random beer
app.get("/random-beer", (req, res, next) => {
  punkAPI.getRandom().then(beers => {
    const theBeer = beers[0];
    res.render("random-beer.hbs", theBeer);
  })
  .catch(error => console.log(error))
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
