const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const PunkAPI = new PunkAPIWrapper();


// creates an absolute path pointing to a folder called "views-- le dices al servidor donde
//se encuentran en este folder

app.set('views', path.join(__dirname, 'views'));

// tell our Express app that HBS will be in charge of rendering the HTM
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partial")

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  PunkAPI
  .getBeers()
  .then(beersFromApi =>res.render('beers', {beersFromApi}) )
  .catch(error => console.log(error));

});

app.get('/random-beer', (req, res) => {
  PunkAPI
  .getRandom()
  .then(responseFromAPI =>res.render('random-beer', {responseFromAPI}))
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
