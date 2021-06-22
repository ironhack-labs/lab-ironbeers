const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + "/views/partials");

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/beers', (req, res) => {
//   punkAPI.getBeers().then((beers) => {
//     res.render('beers', { beers });
//   });
// });

app.get('/beers', async (req, res) => {

  try {
    let lotsOfBeers = await punkAPI.getBeers();
    res.render('beers', { lotsOfBeers });
  } catch {
    console.log(e);
  }

});

app.get('/random-beer', async (req, res) => {

  try {
    let randomBeer = await punkAPI.getRandom();
    res.render('random-beer', randomBeer[0]);
  } catch {
    console.log(e);
  }

});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
