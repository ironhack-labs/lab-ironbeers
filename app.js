const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//PARTIALS
hbs.registerPartials(__dirname + '/views/partials');
// ...

//ROUTES
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi.length);
      res.render('beers', { beers: beersFromApi });
    })
    .catch(e => console.log(e));
});

app.get('/random-beers', (req, res) => {
  punkAPI.getRandom().then(randomBeer => {
    console.log('random beer', randomBeer[0]);
    res.render('random-beers', randomBeer[0]);
  });
});

//SERVER START
app.listen(3000, () => console.log('🏃‍ on port 3000'));
