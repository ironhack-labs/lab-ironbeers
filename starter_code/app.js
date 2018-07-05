
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.set('beers', __dirname + '/beers');
app.use(express.static(path.join(__dirname, 'public')));

app.set('random-beers', __dirname + '/random-beers');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.use((req, res, next) => {
  res.status(404);
  res.send('not-found');
});

app.use((err, req, res, next) => {
  console.error('ERROR', req.method, req.path, err);

  if (!res.headersSent) {
    res.status(500);
    res.send('error');
  }
});


app.listen(3000);