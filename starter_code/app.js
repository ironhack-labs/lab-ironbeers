
const express = require('express');
//const ejs     = require('ejs');
const app     = express();
const path    = require('path');
const port = 3000;
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const expressLayouts = require('express-ejs-layouts');


app.use(express.static('public'));

// configurando ejs
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
    res.render('beers', {beers})
    console.log({beers})
  })
  .catch(error => {
    console.log(error)
  })
})

app.get('/random-beers', (req, res, next) => {
  res.render('random-beers')
})


app.listen(port, (error) => {
  // console.log(`Example app listening on port ${port}!`)
  error ? console.log(error) : console.log('running on 3000');
})
