
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

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(theBeers => {
    
    console.log(theBeers[0])
    
        res.render('beers', {theList:theBeers });

    })
    .catch(error => {
      console.log(error)
      console.log('no beers')
  });
});




app.get('/random', (req, res, next) => {
  punkAPI.getRandom()
  .then(oneBeer => {
    let randomBeer= oneBeer[0];
    console.log('-random beer ------')
    console.log(randomBeer)
    console.log('-beer ingredients ------')
    console.log(randomBeer.ingredients)
    res.render('random', {randomBeer});
  })
  .catch(error => {
    console.log(error)
    console.log('no random beer')
  });
});



app.listen(3000);