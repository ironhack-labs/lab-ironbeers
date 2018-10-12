
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const port = 3000;



app.use(express.static(path.join(__dirname, 'public')));


app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');

app.get('/', (req, res, next) => {
  res.render('index');
});



app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log({beers});
    res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error)
  })
});
app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    const beer = beers[0];
    res.render('random-beer', { beer });
  })

 

  .catch(error => {
    console.log(error)
  })


});



app.listen(port, (error) => {
  error ? console.log(error) : console.log('Running on 3000') ;
})
