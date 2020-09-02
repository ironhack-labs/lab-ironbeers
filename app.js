const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

hbs.registerPartials(path.join(__dirname, 'views/partials'));

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  //res.render('beers');
  
  //let beers = punkAPI.getBeers();
  punkAPI.getBeers()
  //.then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
  .then(beersFromApi => res.render('beers', {beersFromApi}))
  .catch(error => console.log(error));

});

app.get('/beer/:beerId', (req, res) => {
  //res.render('beers');
  
  //let beers = punkAPI.getBeers();
  //console.log(req.params);
  punkAPI.getBeer(req.params.beerId)
  .then(randombeer => res.render('random-beers', randombeer[0]))
  //.then(beersFromApi => res.render('beers', {beersFromApi}))
  .catch(error => console.log(error));

});

app.get('/random-beers', (req, res) => {
  //res.render('beers');
  
  //let beers = punkAPI.getBeers();
  punkAPI.getRandom()
  //.then(randombeer => console.log('beer random: ', randombeer))
  .then(randombeer => res.render('random-beers', randombeer[0]))
  .catch(error => console.log(error));

});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
