const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));





// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});




app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beer: beersFromApi })


    })
    .catch(error => console.log(error));
})



app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beersFromApi => {
      res.render('random-beer', { randomBeer: beersFromApi })

    })

    .catch(error => console.log(error));


})



app.listen(5005, () => console.log('Server listening on port 5005'));
