const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then((beers) => {
    res.render('beers', {beers});
  })
  .catch(e => res.status(500).send("Something went wrong"));
})

app.get('/beers/:id', (req, res) => {
  punkAPI.getBeer(req.params.id)
  .then((beer) => {
    res.render('random-beer', {beer});
  })
  .catch(e => res.status(500).send("Something went wrong"));
})

app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
  .then((beer) => {
    res.render('random-beer', {beer});
  })
  .catch(e => res.status(500).send("Something went wrong"));
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
