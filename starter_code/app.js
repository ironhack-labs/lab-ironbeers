
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

app.get('/Beers', (req,res) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log(beers)
    res.render('Beers', {beers})
    
  })

  .catch(error => {
    console.log(error)
  })
})

app.get('/randomBeer', (req,res) => {
  res.render('randomBeer')
})

app.listen(3000, () => console.log('server listo'));