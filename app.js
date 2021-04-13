const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'))


app.get('/', (req, res) => {
  res.render('index');
})

app.get('/beers', (req, res) => {

 punkAPI
  .getBeers()
  .then(beersFromApi => {
    // console.log('Beers from the database: ', beersFromApi) test
    res.render('beers-page', { beers: beersFromApi })
  })
  .catch(error => console.log(error));
  
})

app.get('/beers/:id', (req, res) => {

 punkAPI
  .getBeer(req.params.id)
  .then(individualBeer => {
    console.log("selecting an individual beer: ", individualBeer)
    res.render('individual-beer', { beer: individualBeer})
  })
  .catch(error => console.log(error));
  
})

app.get('/random-beer', (req, res) => {

  punkAPI
  .getRandom()
  .then(beerFromApi => {
    // console.log('Random beer from the database: ', beerFromApi) test
    res.render('random-page', { beer: beerFromApi })
  })
  .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
