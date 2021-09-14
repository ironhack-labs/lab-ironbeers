const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// CAMBIAR TODOS LOS HTML HACIA ARCHIVOS HBS. PARA QUÉ ? PARA QUE NOS PERMITA UTILIZAR LÓGICA EN LOS HTML

app.set('view engine', 'hbs');

// ME PERMITE UBICAR MIS VISTAS DE APLICACIÓN
app.set('views', path.join(__dirname, 'views'));
// ACTIVAR LA CARPETA "PUBLIC" EN LA APLICACIÓN

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials")
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  
  .then(beersFromApi => {
    //console.log('Beers from the database: ', beersFromApi)
  res.render('beers',{
    beerslist: beersFromApi
  });
})
  .catch(error => console.log(error));
  
 
});
app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render('randomBeer',{
      randombeer:responseFromAPI
    });
  })
  .catch(error => console.log(error));
  
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
