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
hbs.registerPartial(path.join(__dirname, 'views/partials'));




app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {

  punkAPI
  .getBeers()
  .then(beers => {
    res.render('beers', {beers});
  })
  .catch(error => console.log(error));

});

app.get('/random-beer', (req, res) => {

  punkAPI
  .getRandom()
  .then(beer => {
    res.render('random-beer', {beer});
  })
  .catch(error => console.log(error));

});

app.get('/beers/:id', (req, res) => {

  punkAPI
  .getBeer(req.params.id)
  .then(beer => {
    res.render('beer', {beer});
  })
  .catch(error => console.log(error));

});
app.listen(3000, () => console.log('🏃‍ on port 3000'));