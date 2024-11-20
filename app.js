const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

//Configuration HBS view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//Set up static files (img, css)
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/breweries', (req, res) => {
  fetch('https://api.openbrewerydb.org/v1/breweries')
    .then((response) => response.json())
    .then((response) => {
      res.render("breweries", {breweries: response})
    });
});

app.get('/random-breweries', (req, res) => {
  fetch('https://api.openbrewerydb.org/v1/breweries/random')
  .then((response) => response.json())
  .then((response) =>{
    res.render('random-breweries', {breweries: response});
  });
  
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
