const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:


// add the routes here:
app.get('/', (req, res) => res.render('index'));


app.get('/', (req, res) => {
  res.render('HOME')
})

app.get('/beers', (req, res) => {

  punkAPI.getBeers().then((beers) => {
    //console.log(beer[0])   //Test
    res.render('beers', { allMyBeersArray: beers })
  })

/*  //general code 
    punkAPI
    .getBeers()
    .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
    .catch(error => console.log(error)); */

  res.render('BEERS')
})

app.get('/random-beer', (req, res) => {
  res.render('RANDOM-BEER')
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));