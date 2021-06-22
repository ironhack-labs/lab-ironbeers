const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

//setting partial locations
hbs.registerPartials(__dirname + "/views/partials");

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', async (req, res) => {
  let beersFromTheAPI = await punkAPI.getBeers();
  res.render('beers', { beersFromTheAPI });
});


app.get('/randombeers', async (req, res) => {
  let theRandomBeers = await punkAPI.getRandom();
  res.render('randombeers', { theRandomBeers});
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
