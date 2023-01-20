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

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => { 
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      // console.log('Beers from the database: ', beersFromApi)
      res.render('beers', { beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      // console.log('Beers from the database: ', responseFromAPI)
      res.render('random-beer', { responseFromAPI });
    })
    .catch(error => console.log(error));
});

/*
Qué está pasando con getBeer(id)? Porque en su documentación
sólo da de ejemplo una constante.

Según las funciones de la librería PunkAPIWrapper dentro de node_modules,
getBeer(id) devuelve: (https://api.punkapi.com/v2/beers/id). Array que, en su pocisión 0, tiene un objeto con
todas sus claves, entonces: array[0].clave 
*/
// punkAPI.getBeer(1).then(beers => {
//   console.log(beers[0].name);
// });

app.get('/beers/:id', (req, res) => {
  
  // Puedo manipular req.params.id? slice() eliminará beer- que trae por defecto en beerpartial.hbs?
  // const id = req.params.id
  // console.log(typeof id);
  // console.log(id.slice(5));

  const id = req.params.id.slice(5)

  punkAPI
    .getBeer(id)
    .then( beers => {
      const singleBeer = beers[0]
      
      res.render('beer', { singleBeer }); 
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
