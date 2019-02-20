const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const axios = require('axios');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res, next) => {
  res.render('index');
});


app.get('/beers', (req, res, next) => {
  axios.get("https://api.punkapi.com/v2/beers")
  .then(beers => {
    debugger
    res.render('beers', {beers: beers.data})
  })
    .catch(error => {
      console.log(error)
    })
})

app.get('/random-beers', (req, res, next) => {
  axios.get("https://api.punkapi.com/v2/beers")
  .then(beers => {
    res.render('random-beers', {beers: beers.data})
  })
    .catch(error => {
      console.log(error)
    })
})

app.listen(3000);