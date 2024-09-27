const express = require('express');

const hbs = require('hbs');

const path = require('path');
hbs.registerPartials(path.join(__dirname, 'views/partials'));
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


// Configure HBS view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers().then((beers) => {
    console.debug(beers);
    res.render('beers', {beers: beers});
  })
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom().then(beers => {
    console.log(beers)
    res.render('random-beer', {beers: beers});
  })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));


