const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try {
    const beers = await punkAPI.getBeers();
    res.render('beers', { beers });
    //console.log(beers);
  } catch (err) {
    console.log(err);
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    const randomBeers = await punkAPI.getRandom();
    res.render('random-beer', { randomBeers });
    //console.log(beers);
  } catch (err) {
    console.log(err);
  }
});

app.get('/beers/beer-:id', async (req, res) => {
  console.log(req.params);
  try {
    const id = await punkAPI.getBeer(req.params.id);
    //console.log(id);
    res.render('beerDetail', { id });
    //console.log(beers);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
