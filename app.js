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

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', { css:["index"]});
});

app.get('/beers', async (req, res) => {
  try {
    res.render('beers', {
      beers:await punkAPI.getBeers(),
      css: ["beers"]
    })
  } catch (error) {
    console.error(error)
  }
})

app.get('/random-beers', async (req, res) => {
  try {
    res.render('random-beer', {
      beer:(await punkAPI.getRandom())[0],
      css:["beer"]
    })
  } catch (error) {
    console.error(error)
  }
})

app.get('/beers/beer-:id', async (req, res) => {
  const id = req.params.id
  try {
    res.render('random-beer', {
      beer:(await punkAPI.getBeer(id))[0],
      css: ["beer"]
    })
  } catch (error) {
    console.error(error)
  }
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
