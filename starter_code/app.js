const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const beers   = require('./beers.json');
const axios   = require('axios');

//toggle the boolean value to use local json file or API
const useAPI = true;

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => res.render('index'));

if (useAPI) {
  app.get('/beers', (req, res) =>{
    axios.get('https://api.punkapi.com/v2/beers')
      .then(beers => {
        console.log(beers.data);
        res.render('beers', {beers: beers.data} )})
      .catch(error => console.log(error))
    });    
    app.get('/random-beers', (req, res) =>{
      axios.get('https://api.punkapi.com/v2/beers/random')
      .then(beers => {
        let randomBeer = beers.data[0];
        res.render('random-beers', {randomBeer});
      })
      .catch(error => console.log(error))
    });
} else {
    app.get('/beers', (req, res) => res.render('beers', {beers}));
  app.get('/random-beers', (req, res) =>{
    let randomBeer = beers[Math.floor(Math.random() * beers.length)];
    res.render('random-beers', {randomBeer});
  })
}

app.listen(3000, ()=> console.log("ja? wat nou weer!?"));
