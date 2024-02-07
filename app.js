const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Register the location for handlebars partials here:
hbs.registerPartials(`${__dirname}/views/partials`);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/beers', (req, res) => {
  punkAPI.getBeers().then(beers => {
    res.render('beers', { data: beers });
    console.log(beers)
  });
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom().then(beer => {
    res.render('random-beer', { beer: beer[0] });
  });
});
app.get('/infoBeer/:id', (req, res) => {
  const idBeer = req.params.id;
  

  punkAPI.getBeer(idBeer).then(beer => {
    res.render('infoBeer', { beer: beer[0] });
  });
});

app.get('/', (req, res) => {
  punkAPI.getRandom().then(beer => {
    res.render('index', { data: beer });
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
