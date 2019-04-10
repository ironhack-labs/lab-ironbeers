require('dotenv').config();

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
  const data = {
    sectionTitle: "Home"
  };
  
  res.render('index', data);
});

app.get('/beers', (req, res, next) => {
  const data = {
    sectionTitle: "Beers"
  };

  res.render('beers', data);
});

app.get('/random-beers', (req, res, next) => {
  const data = {
    sectionTitle: "Random Beers"
  };

  res.render('random-beers', data);
});



app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT)
})
