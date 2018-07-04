
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules/jquery/dist'))
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'))

//Definimos un helper para comparar strings dentro de los archivos hbs
hbs.registerHelper('if_equal', function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});

app.get('/', (req, res, next) => {
  res.render('partials/index', {title: 'Home', active: 'home'});
});

app.get('/beers', (req, res, next) => {
  // punkAPI.getBeers()
  // .then(beers => {
  //
  // })
  // .catch(error => {
  //   console.log(error)
  // })
  res.render('partials/beers', {title: 'Beers', active: 'beers', beers: beers});
});

app.get('/random-beers', (req, res, next) => {
  res.render('partials/random-beers', {title: 'Random Beers', active: 'random'});
});


app.listen(3000);
