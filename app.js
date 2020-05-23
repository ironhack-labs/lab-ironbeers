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

hbs.registerPartial(__dirname, "/views/partials")

// ...

// Add the route handlers here:

app.get('/', (req, res, next) => {
  res.render('index');
  //next()
});

app.get('/beers', async (req, res, next) => {
  const beers = await punkAPI.getBeers()
  res.render("beers", {
    beers
  })
  // punkAPI
  //   .getBeers()
  //   .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
  //   .catch(error => console.log(error));

  // res.render('beers')
  //next()
})

app.get('/random-beers', async (req, res, next) => {
  const randomBeers = await punkAPI.getRandom()
  res.render('random-beers', {
    randomBeers
  })
  //next()
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));