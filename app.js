const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
// esta require es donde están los datos de las cervezas.

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
  punkAPI.getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);// el API de las cervezas
// no poner aquí el res.render porque el codigo que le sigue no funciona
      const data = { beers: beersFromApi }; // se hace una constante porque llamamos a muchos datos
      res.render('beers', data);// ponerlo aquí para que funcione la promesa/codigo
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then(responseFromAPI => {
      console.log('Random beer from the database: ', responseFromAPI);

      res.render('random-beer', responseFromAPI[0]);// no se forma una constante porque en este caso se llama de forma aleatoria un dato.
      //se pone [0] porque queremos que solo llame un dato de tantos.
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
