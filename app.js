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
// Add the route handlers here:
//HOME

app.get('/', (req, res) => {
  res.render('index');
});

//BEERS

app.get('/beers', async (req, res) => {
  const beersFromApi = await punkAPI.getBeers();
  //console.log(beersFromApi);
  res.render('beers', { beers: beersFromApi });
});

//Random Beer
app.get('/random-beer', async (req, res) => {
  const randomApi = await punkAPI.getRandom();
  console.log(randomApi);
  res.render('random-beer', { random: randomApi });
});

app.listen(3000, () => console.log(':runner:‍ on port 3000'));
