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

hbs.registerPartials(path.join(__dirname, '/views/partials'))

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beer', (req, res) => {
  const allOfTheBeers = punkAPI
  .getBeers()
  .then(beersFromApi => res.render('beer', {beer: beersFromApi}))
  console.log(allOfTheBeers)
})

app.get('/details/:id', (req, res) => {
  const beerId = req.params.id;
  punkAPI.getBeer(beerId).then(data => res.render('beer', {beer: data})) 
  // const allOfTheBeers = punkAPI
  // .getBeers()
  // .then(beersFromApi => res.render('beer', {beer: beersFromApi}))
  // console.log(allOfTheBeers)
})

app.get('/random-beer',(req, res)=> {
  const someBeer = punkAPI
  .getRandom()
  .then(responseFromAPI => res.render('random-beer', {beer: responseFromAPI}))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
