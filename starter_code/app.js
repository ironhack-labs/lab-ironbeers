const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(`${__dirname}/views/partials`);

app.get('/', (req, res, next) => {
  const data = {
    title: 'Home',
    style: 'index.css'
  }
  res.render('index', {data});
});

app.get('/beers', (req, res, next) => {
  const data = {
    title: 'Beers',
    style: 'beers.css'
  };
  punkAPI.getBeers().then( beers => res.render( 'beers', {beers,data} ) ).catch( error => console.log(error) );
});

app.get('/random-beers', (req, res, next) => {
  const data = {
    title: 'Random Beer',
    style: 'random.css'
  }
  punkAPI.getRandom().then( beers => res.render( 'random', {beers,data} ) ).catch( error => console.log(error) );
});


app.listen(3000);