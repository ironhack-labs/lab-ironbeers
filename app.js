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

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');

});


app.get('/beers', (req, res) => {
  //console.log('/beers work')
  punkAPI.getBeers()
  .then(beersFromApi => {
    
    res.render('beers', {beerList: beersFromApi})

    //console.log('Beers from the database: ', beersFromApi)

  })
  .catch(error => console.log(error));
  
});

app.get('/random-beers', (req, res) => {
  console.log('/random-beers work')
  punkAPI.getRandom()
  .then(randomBeer => {
    
    res.render('random-beers', {randomBeer: randomBeer})

    console.log('random beer: ', randomBeer)

  })
  .catch(error => console.log(error));
  
});


app.get('/specific/:id', (req, res) => {
  console.log('/click works')
  console.log(req.params.id)

  punkAPI.getBeer(req.params.id)
  .then(beerFromApi => {
    console.log(beerFromApi)
    res.render('specific', {clickedBeer: beerFromApi[0]})

  })
  .catch(error => console.log(error));

});

app.listen(3002, () => console.log('🏃‍ on port 3002'));
