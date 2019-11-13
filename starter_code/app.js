
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

app.get('/', (req, res, next) => {
  res.render('index.hbs');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render("beers", { beers })
    console.log(beers)
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('random', {beerPartial: beers[0]});
  })
  .catch(error => {
    console.log(error)
  })

});

app.get('/:id', (req, res, next) => {
  console.log(req.params.id);

  punkAPI.getBeer(req.params.id)
  .then(beers => {
    res.render('beersId', {
      beers
    });
  })
  .catch(error => {
    console.log(error);
    next(error);
  });
});

app.listen(3000);
