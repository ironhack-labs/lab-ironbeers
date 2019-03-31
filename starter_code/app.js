
const express = require('express');
const hbs     = require('hbs');
const PORT = 3002;
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  next();
})

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  res.render('beers');
});

app.get('/random-beers', (req, rest, next) => {
  res.render('random-beers');
});



app.listen(3002);
