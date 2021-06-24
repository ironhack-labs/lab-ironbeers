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

hbs.registerPartials(path.join(__dirname, './views/partials'));

// Add the route handlers here:

app.all('/', (req, res) => {
  res.render('index');
});


app.all('/beers', (req, res) => {
    punkAPI.getBeers()
    .then(beersArr => res.render("beers", {beersArr})) //HAVE TO CONVERT ARRAY TO OBJECT
    .catch(error => console.log(error))
});


app.all('/beers/:id', (req, res) => {
  const idBeer = punkAPI.getBeer(req.params.id);
  idBeer.then(idBeerArr => res.render("id_beer", {idBeerArr}))
  .catch(error => console.log(error))
});


app.all('/random-beer', (req, res) => {
  const randomBeer = punkAPI.getRandom();
  randomBeer.then(randomBeerArr => res.render("random_beer", {randomBeerArr}))
  .catch(error => console.log(error))
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
