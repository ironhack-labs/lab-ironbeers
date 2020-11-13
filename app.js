const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const app = express();
const punkAPI = new PunkAPIWrapper();


// Register the location for handlebars partials here:
app.use(express.static('public'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// app.set('views', __dirname, + '/views');


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {

  punkAPI
  .getBeers()
  .then(beers => {
    const options = {
      beers: beers
    }
    res.render('beers', options);
  })

  .catch(error => {
    console.log(error)
  })
  
});


app.get('/random-beer', (req, res) => {

  punkAPI
  .getRandom()
  .then(beer => {
    console.log(beer);
    res.render('random-beer', beer[0]);
  })

  .catch(error => {
    console.log(error)
  })
  
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
