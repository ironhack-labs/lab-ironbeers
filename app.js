const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const server = express();
const punkAPI = new PunkAPIWrapper();

server.set('view engine', 'hbs');
server.set('views', path.join(__dirname, 'views')); // === __dirname + '/views

server.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

// server.get(); // vamos a recibir una llamada get

// server.get('/pepe', (_, response) => {
//   response.render('index');
// });
// cuando nos hagan una llamada a '/pepe', lo que vamos a response sera una renderización del archivo index.hbs


server.get('/', (req, res) => { // esto es la rita '/'
  res.render('index');
});

server.get('/beers', (req, res) => { // esto es la ruta '/beers'
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database:', beersFromApi);
      res.render('beers', { beersFromApi });
    })
    .catch(error => console.log(error));
});

server.get('/random-beer', (req, res) => { // esto es la ruta '/random-beers'
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('random-beer', { responseFromAPI });
    })
    .catch(error => console.log(error))

});

server.listen(5005, () => console.log('🏃‍ on port 5005'));
