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


app.get('/', (req, res) => {
  res.render('home');
});



app.get('/beers', (req, res) => {

  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', { beers: beersFromApi }))
    .catch(error => console.log(error));

})

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('random-beers', { randomBeer: responseFromAPI })

    })
    .catch(error => console.log(error));


})

app.listen(5005, () => console.log('‍Runing on port 5005'));
