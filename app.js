// Requerir Express
const express = require('express');
//instanciar express
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
// iniciar la aplicacion a partir de express
const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');


app.set('views', path.join(__dirname, 'views'));
// incluir el middleware de directorio con archivos estatícos public
app.use(express.static(path.join(__dirname, 'public')));
// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render("index");
})
app.get('/beers', (req, res) => {

  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render("beers", { beers: beersFromApi })
        .catch(error => console.log(error));
    })



})
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render("random-beer", { randombeer: responseFromAPI });
      // console.log('Beers from the database: ', responseFromAPI)

    })
    .catch(error => console.log(error));
})
// levantar servidor
app.listen(3000, () => console.log('🏃‍ on port 3000'));
