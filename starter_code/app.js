
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
  const data = {
    title: "Home"
  }
  res.render('index', data);
});
app.get('/beers', (req, res) => {
  const data = {
    title: "Beers"
  }
  punkAPI.getBeers()
  .then(beers => {
    data.beer = beers;
    res.render('beers', data);
  })
  .catch(error => {
    console.log(error)
  })
});
app.get('/randomBeers', (req, res) => {
  const data = {
    title: "Random Beers"
  }
  punkAPI.getRandom()
  .then(beers => {
    data.beer = beers;
    res.render('randomBeers', data);
  })
  .catch(error => {
    console.log(error)
  })
});


app.listen(3000, () => console.log(`Listening`));