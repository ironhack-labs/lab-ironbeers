
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
  console.log('chamou a rota /')
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      console.log('beers route')
      res.render('beers', { beers });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/randomBeer', (req, res, next) => {
  punkAPI.getRandom()
    .then(beer => {
      console.log(beer)
      res.render('randomBeer', { beer });
    })
    .catch(error => {
      console.log(error)
    });
});

app.listen(3000, () => {
  console.log('My lab-ironbeers is listening on port 3000!')
});
