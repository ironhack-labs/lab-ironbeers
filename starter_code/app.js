
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/components')
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');



app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next)=> {
  res.render('beers')
})

app.get('/randome-beers', (req, res, next) => {
  res.render('randomeBeers')
})

app.listen(3000);
