
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials')



app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then( beers => {
      res.render('beers', { beers })
      // console.log(beers[0])
    })
    .catch(e => {
      console.log(e, "Birras not found.")
    })
})

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('randomBeer',  { beer: beers[0] } )
  })
  .catch(error => {
    console.log(error)
  })
})



app.listen(3000);
