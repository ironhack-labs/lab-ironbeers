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

hbs.registerPartials(__dirname + "/views/partials")

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', { beersFromApi }))
    .catch(error => console.log(error));

});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(beersFromApi => res.render('random-beers', { beersFromApi }))
    .catch(error => console.log(error));

})

app.get('/random-beers/:id', (req, res) => {

  punkAPI
    .getBeer(req.params.id)
    .then(beersFromApi => res.render('random-beers', { beersFromApi }))
    .catch(error => console.log(error))
})

// Volvió a pasar lo mismo que después de instalar el node: me tiraba un error con el puerto, lo cambié a 3003
app.listen(3003, () => console.log('🏃‍ on port 3000'));
