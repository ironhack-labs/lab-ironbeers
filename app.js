const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try {
    const beersReq = await punkAPI.getBeers();
    res.render('beers', { beersReq });
  } catch (error) {
    error.log(error);
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    const [randomBeer] = await punkAPI.getRandom();
    res.render('random-beer', randomBeer);
  } catch (error) {
    error.log(error);
  }
});

app.get('/beers/:id', async (req, res) => {
  try {
    const [beer] = await punkAPI.getBeer(req.params.id)
    res.render('random-beer', beer)
  } catch (error) {
    error.log(error)
  }
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
