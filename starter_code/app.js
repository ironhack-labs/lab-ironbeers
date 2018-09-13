
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const port = 3000;
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views'); //en dirname no se pone el folder de app.js? en ese caso, como está fuera de views, sería starter-code, no?
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');   //duda: ¿cuándo hay que poner res.sender y cuándo res.sendFile con dirname? no encuentro la diferencia...
});

app.get('/', (req, res, next) => {
  res.render('layout'); //esta no hacía falta ponerla, no?
});

app.listen(port, () => {
  console.log(`Port ${port}`);
});


