
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

// HBS will be in charge of rendering the HTML
app.set('view engine', 'hbs');
// creates an absolute path pointing to a folder called "views"
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (req, res, next) => {
  res.render('index', {
    page: {
      title: 'Home'
    } 
  });
});

app.get('/beers', (req, res, next) => {
  
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', {
        beers,
        page: {
          title: 'Beers'
        }
      })
    })
    .catch(error => {
      res.render('error')
    })
});

app.get('/random-beer', (req, res, next) => {

  punkAPI.getRandom()
    .then(beer => {
      res.render('random-beer', { 
        beer,
        page: {
          title: 'Random beer'
        }
      })
    })
    .catch(error => {
      res.render('error')
    })
});

app.listen(3000);
