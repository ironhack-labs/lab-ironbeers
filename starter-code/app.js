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

hbs.registerPartials(__dirname + '/views/partials') 

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
   const allBeers = punkAPI
  .getBeers()
  .then(allBeers => {
  console.log('Beers from the database: ', allBeers)
  res.render('beers', { allBeers });
  })
  .catch(error => console.log(error));   
})

app.get('/random-beers', (req, res) => {
    const randBeer = punkAPI
    .getRandom()
    .then(randBeer => {
    // your magic happens here
    console.log('A random beer', randBeer)
    res.render('random-beers', { randBeer });
     })
  .catch(error => console.log(error));  
})




app.listen(3000, () => console.log('🏃‍ on port 3000'));
