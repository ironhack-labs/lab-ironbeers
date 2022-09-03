const express = require('express');

const hbs = require('hbs');
const { restart } = require('nodemon');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', {
    doctitle: "Index"
  });
});

app.get('/beers', async (req, res) => {  
  try {
    const beersFromApi = await punkAPI.getBeers();
    console.log("Beers from the database: ", beersFromApi)
  res.render('beers', {
    doctitle: "Beers",
    beers: beersFromApi
  });   
  } catch(error) {res.send("There was an error. Sorry! :'(")}
});

app.get('/random-beer', async (req, res) => {  
  try {
    const randomBeerFromApi = await punkAPI.getRandom();
    console.log("Random Beer from the database: ", randomBeerFromApi)
  res.render('randomBeer', {
    doctitle: "Random Beer",
    beer: randomBeerFromApi[0]
  });   
  } catch(error) {res.send("There was an error. Sorry! :'(")}
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
