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

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res) => {
  
  punkAPI.getBeers()
    .then((beersFromApi) => {
      // console.log('Beers from the database: ', beersFromApi)
      res.render('beers', {allTheBeers: beersFromApi});
  });
    
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then((randomBeerFromApi) => {
    // console.log('Random Beer from the database: ', randomBeerFromApi)
    res.render('random-beer', {randomBeer: randomBeerFromApi[0]});
  });

});


app.get('/beers/:theID', (req,res) => {
  punkAPI.getBeer(req.params.theID)
  .then((beerDetails) => {
    
    res.render("beer-details", {theBeer: beerDetails[0]})
    // console.log("Details of Beer are: ", beerDetails)
  
  });
  
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
