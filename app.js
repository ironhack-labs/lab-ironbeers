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
  // res.send('Test')
  res.render('index');
});

app.get('/beers', (req, res) => {
  
  punkAPI
    .getBeers()
    .then( beersFromApi => res.render('beers', {beersFromApi}))
    .catch(error => console.log(error))
});

app.get('/random-beer', (req, res) => {
  // res.send(`Random beer :)`)
  punkAPI
  .getRandom()
  // .then( beerFromApi => console.log(beerFromApi[0].food_pairing))
  .then( beerFromApi => res.render('random-beer', beerFromApi[0]))
  .catch( err => console.log(err) )

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));



// *************** HOW DO I GET A BEER? ***********************
// const beerById = punkAPI.getBeer(:id)
// const beerByOptions = punkAPI.getBeers(:options)
// const randomBeer = punkAPI.getRandom()
// *************** ALL BEERS WITH ABV GREATER THAN 8 **********
// const strongBeers = punkAPI.getBeers({'abv_gt': 8})

// *************** WHAT IS A FUZZY MATCH? *********************
// SEE punkAPI.getBeers({'food': algunRegex?})