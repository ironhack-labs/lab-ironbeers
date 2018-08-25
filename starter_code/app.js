
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

//Home 
app.get('/', (req, res, next) => {
  console.log(request);
  response.sendFile(__dirname+"/Views/home.html");
});

//Beers
app.get('/beers', (req, res, next) => {
    console.log(request);
    response.sendFile(__dirname+"/Views/beers.html");
});

//Random beers
app.get('random-beers/', (req, res, next) => {
    console.log(request);
    response.sendFile(__dirname+"/Views/random-beers.html");
});

app.listen(3000);