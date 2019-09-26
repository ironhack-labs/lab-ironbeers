
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (request, response, next) => {
  const beers = async 
});

app.get('/random-beers', (request, response, next) => {
  response.sendFile(__dirname + '/views/random-beers.hbs');
});

punkAPI.getBeers()
  .then(beers => {

  })
  .catch(error => {
    console.log(error)
  })

hbs.registerPartials(__dirname + '/views/partials');

app.listen(3000);
