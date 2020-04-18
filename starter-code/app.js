const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
console.log(punkAPI);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
        console.log('Beers from the database: ', beersFromApi);
        res.render('beers', {beersFromApi});
      })
    .catch(error => {
        console.log(error);
      });
      
});

app.get('/randomBeers', (req, res) =>{
  punkAPI
    .getRandom()
    .then(randomBeersFromApi => {
      console.log('Random beers from database: ', randomBeersFromApi);
      res.render('randomBeers', {randomBeersFromApi});
    })
    .catch(error => console.log(error));
});

// app.get('/something', (req, res) => res.render('smthg'));

app.listen(3000, () => console.log('🏃‍ on port 3000'));
