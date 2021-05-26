const express = require('express');
const hbs = require('hbs');
const path = require('path');
const morgan = require('morgan');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const port = 5001;

const app = express();
const punkAPI = new PunkAPIWrapper();
// view engine will be hbs,
app.set('view engine', 'hbs');
//app.set means configuring something with express, where views are storaged, folder for template
app.set('views', path.join(__dirname, './views'));
//.use public folder to work with express and used it to save static files: css, images, index.html...
app.use(express.static(path.join(__dirname, 'public')));
//dirname related to location of plublic folder
app.use(express.static('public'));
app.use(morgan('dev'));

// Register the location for handlebars partials here:
// ...

// Add the route handlers here:

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers.hbs', {
        beersFromApi
      });
    })
    .catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      res.render('random-beer.hbs', {
        randomBeer
      });
    })
    .catch(error => console.log(error));
});

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.listen(port, console.log(`Server is running on port: ${port}`));
