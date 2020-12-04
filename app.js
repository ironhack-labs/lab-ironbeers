const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
// hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try {
    const beers = await punkAPI.getBeers(25);
    res.render('beers', { beers });
  } catch (err) {
    res.send(err);
  }
});

app.get('/random-beers', async (req, res) => {
  try {
    const randomBeers = await punkAPI.getRandom();
    res.render('random-beers', { randomBeers });
  } catch (err) {
    res.send(err);
  }
});

app.get('/beers/:id([0-9])', async (req, res) => {
  try {
    const oneBeer = await punkAPI.getBeer(req.params.id);
    res.render('detailsBeer', { oneBeer });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
