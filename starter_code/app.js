
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





app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
   punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beerRack: beers});
  })
  .catch(error => {
    console.log(error)
    res.render('beers', error)
  })
  
});
app.get('/randomBeers', (req, res) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('randomBeers', {oneBeer: beers});
  })
  .catch(error => {
    console.log(error)
  })
  
});
app.get('*', (req, res) => {
  res.render('notFound');
});



app.listen(3000, () => {
  console.log('Mega componental website is up and running at port 3000');
})
