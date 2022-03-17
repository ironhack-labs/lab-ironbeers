const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:

app.get('/home', (req, res) => {
  res.render('index.hbs');
});

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get('/beers', async (req, res) => {
  const beersFromApi = await punkAPI.getBeers();
  res.render("beers.hbs", { beersFromApi });
  //console.log('Beers from the database: ', beersFromApi);
});

app.get('/random-beers', async (req, res) => {
  const randomBeersFromApi = await punkAPI.getRandom();
  res.render("random-beers.hbs", { randomBeersFromApi });
  console.log('Random beer from the database: ', randomBeersFromApi)
})

app.listen(PORT, () => console.log(`🏃‍ on port ${PORT}`));
