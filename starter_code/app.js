
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
let site = '/';

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  site = '/';
  const data={
    isActiveHome: true,
    isActiveBeer: false,
    isActiveRandomBeer: false
  }
  res.render('index', data);
});
app.get('/beers', (req, res, next) => {
  site = '/beers';
  punkAPI.getBeers()
  .then(beers => {
    const data = {
      isActiveHome: false,
      isActiveBeer: true,
      isActiveRandomBeer: false,
      beers: beers
    }
    res.render('beers', data);
  })
  .catch(error => {
    console.log(error)
  })
});
app.get('/random-beer', (req,res,next)=>{
  site = '/random-beer';
  punkAPI.getRandom()
  .then(beers => {
    const data = {
      isActiveHome: false,
      isActiveBeer: false,
      isActiveRandomBeer: true,
      beer: beers
    }
    res.render('randomBeer', data);
  })
  .catch(error => {
    console.log(error)
  })
});


app.listen(3000);