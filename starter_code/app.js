const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials')


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', async (req, res, next) => {
  const beer = await punkAPI.getBeers();
  try {
    res.render("beers", {
      beer
    });
  } catch (error) {
    throw new Error(error);
  }
});

app.get('/random-beers', async (req, res, next) => {
  const beer = await punkAPI.getRandom();
  try {
    res.send(beer[0]);
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(3000);