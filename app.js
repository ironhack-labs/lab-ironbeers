const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(expressLayouts);
app.set('layout', 'layout');
app.set('layout extractScripts', true);

app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('im stopping the middleware here not calling next');
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers',{ beers });
  })
  .catch(error => {
    console.log(error)
  });
});

app.get('/randomBeers', (req, res) =>{
  punkAPI.getRandom()
  .then(beers => {
    res.render('randomBeers',{ beers });
  })
  .catch(error => {
    console.log(error)
  })

});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
