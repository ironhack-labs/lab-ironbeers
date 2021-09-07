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

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  //res.send('éstoy en index');
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', { data: beersFromApi }))
    .catch(error => console.log(error));

  //res.send('éstoy en beers');
});

app.get('/random-beers', (req, res) => {
  //res.send('éstoy en index');
  res.render('random-beers');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

// HBS
//hay q poner <htm>, <body></body> ???

//HBS
//Porque en beers no me aparece la frase que pongo en hbs?

//APP.JS
//IMPRIMIR o VIEW (?) el array de beers en beers.hbs, con su foto y nombre
