const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

//Bonus Iteracion 5 - Beer Partial
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  const beers = await punkAPI.getBeers();
  res.render('beers', {beers});
  console.log(beers)
});

app.get('/random-beers', async (req, res) => {
  const beers = await punkAPI.getRandom();
  res.render('random-beer', {beers});
  //console.log(beers)
});

//Bonus Iteracion 6
app.get('/beers/:beerId', async (req, res) => {
  const beers = await punkAPI.getBeer(req.params.beerId);
  res.render('random-beer', beers[0]);
  console.log(beers[0])

});


app.listen(8000, () => console.log('🏃‍ on port 8000'));
