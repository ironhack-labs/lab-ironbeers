
const express = require('express');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));


// app.get('/', (req, res, next) => {
//   res.render('index');
// });
app.get('/', (req, res) => {
  res.render('home');
});
app.get('/beers', (req, res) => {
  res.render('beers');
});
app.get('/random-beers', (req, res) => {
  res.render('random-beers');
});

app.listen(3000);
