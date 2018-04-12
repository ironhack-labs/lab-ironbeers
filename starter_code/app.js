
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

hbs.registerPartials(__dirname + "/views/partials");

punkAPI.getBeers().then(beers => {
    app.get('/beers', (req, res, next) => {         
      res.render('beers'); 
      console.log(beers)   
   });
  })
  .catch(error => {
    console.log(error)
  })

app.listen(3000);