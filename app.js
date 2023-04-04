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
  res.render('index', {
    beerImage: '/images/beer.png'
  });
});

app.get('/beers', (req, res) => {
  // const beerArr = punkAPI.getBeers();
  punkAPI.getBeers() // funcion que llama a la base de datos de beers
    .then((beerArr) => {  // la promesa escucha y cuando tiene los datos,  el .then() ejecuta una funcion que como parametro está pasando el array de datos
      res.render('beers', { beers:beerArr }); // la función lo que hace es renderizar el array. "beers" será la key que yo luego pasaré a la plantilla .hbs 
      console.log('Beers from the database: ', beerArr);
    })
    .catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then((randomBeer) => {
      console.log(randomBeer);
      res.render('random-beers', { randomBeer });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
