const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

// Routes
app.get('/', (req, res, next) => {
  res.render('index');
});


app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      console.log(beers);
      res.render('beers', {
        beers
      });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/random-beers', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beers => {
      console.log(beers);
      res.render('random-beers', {
        beers: beers[0]
      });
    })
    .catch(error => {
      console.log(error);
    });
});

// PORT
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Open on ${PORT}`);
});
