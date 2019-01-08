
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  const beers = req.query;

  punkAPI.getBeers(beers)
  .then(beers => {
    res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error);
  })

})

app.get('/random-beer', (req, res, next) => {

  punkAPI.getRandom()
  .then(beer => {
    console.log(beer);
    res.render('randomBeer', beer[0]);
  })
  .catch(error => {
    console.log(error);
  })
})

app.listen(PORT, () => {
  console.info(`Listening at port ${PORT}`);
});
