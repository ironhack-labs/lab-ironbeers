const express = require('express');
const hbs = require('hbs');
const path = require('path');

const getBeers = require('./getBeers');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  const beerList = await getBeers();
  console.log(beerList[0]);
  res.render('beers', { beers: beerList });
});

app.get('/random-beers', async (req, res) => {
  const beerList = await getBeers();
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
