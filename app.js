const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { get } = require('http');
hbs.registerPartials(__dirname + "/views/partials")

const app = express();
const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
// let beers = {}



// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers=>{res.render("beers", {beers})})
  .catch(error=>{console.log([error])})
});

app.get('/randomBeers', (req, res) => {
  punkAPI.getRandom()
  .then(cervesas=>{res.render("randomBeers",{cervesas})})
  .catch(error=>{console.log([error])})
});

app.listen(3000, () => console.log('🏃‍ on port :http://localhost:3000'));
