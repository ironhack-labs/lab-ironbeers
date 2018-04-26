
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


// always goes first!
hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {

  punkAPI.getBeers()
  .then(responseFromAPI => {
    
	// console.log(responseFromAPI) // so you can see the structure of the data
  res.render('beers', { beers: responseFromAPI });//make sure to put the res.render inside the .then block
  })
  .catch(error => {
    console.log(error)
  })
});


app.get('/random-beers', (req, res, next) => {

  punkAPI.getRandom()
  .then(oneRandomBeerFromAPI => {
    
    res.render('random-beers', { randomBeer: oneRandomBeerFromAPI[0]});
  })
  .catch(error => {
    console.log(error)
  })

});

app.listen(3000);