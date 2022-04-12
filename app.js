const express = require('express');
const req = require('express/lib/request');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
  console.log("i am /")
});


app.get('/beers', (req, res) => {

  console.log("i am beers")
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', { beersFromApi }))
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {

  console.log("i am random beer")
  punkAPI
    .getRandom()
    .then(beers => res.render('beer', { beers }))
    .catch(error => console.log(error));
});

app.get('/beers/:id', (req, res) => {

  console.log("el parametro es: ", req.params.id)
  punkAPI
    .getBeer(req.params.id)
    .then(beers => res.render('beer', { beers }))
    .catch(error => console.log(error));
});




app.listen(3000, () => console.log('🏃‍ on port 3000'));
