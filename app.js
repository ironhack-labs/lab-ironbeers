const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
// hbs.registerPartials( path.join(__dirname, 'views/partials'))

hbs.registerPartials(`${__dirname}/views/partials`)

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers/:id', (req, res) => {
  // console.log(req.params)
  const {id} = req.params  
  punkAPI
    .getBeer(id)
    .then( beerFromApi => res.render('beer', beerFromApi[0]))
    // .then( beerFromApi => console.log(beerFromApi[0]))
    .catch(error => console.log(error))
});

app.get('/beers', (req, res) => {
  
  punkAPI
    .getBeers()
    .then( beersFromApi => res.render('beers', {beersFromApi}))
    .catch(error => console.log(error))
});

app.get('/random-beer', (req, res) => {
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