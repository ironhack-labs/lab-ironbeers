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

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/beers', (req, res, next) => {
  const beers = punkAPI.getBeers();
  beers.then(beersFromAPI => 
    res.render('beers', {beersFromAPI}));
  beers.catch(error => console.log(error));
});

app.get('/random', (req, res, next) => {
  const randomBeers = punkAPI.getRandom();
  randomBeers.then(random => {
    res.render('random', {data : random});
  })
  randomBeers.catch(error => 
    console.log(error));
});

hbs.registerPartials(__dirname + '/views/partials');

// ...

const router = require('./config/routes.js');
app.use('/', router);


// Add the route handlers here:


app.listen(3000, () => console.log('Que rule el 3000!'));
