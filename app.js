const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
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
    const beersArr = await punkAPI.getBeers()
    res.render('beers', {beersArr});
  }
  catch (err) {
    console.log(err)
  }
});

app.get('/random-beers', async (req, res) => {
  try {
    const [ beerRand ] = await punkAPI.getRandom();
    res.render('randomBeers', {beerRand});
  }
  catch (err) {
    console.log(err)
  }
});

app.get('/beers/:id', async (req, res) => {
  try {
    const [ beer ] = await punkAPI.getBeer(req.params.id);
    res.render('beer', {beer});

  }
  catch (err) {
    console.log(err)
  }
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));