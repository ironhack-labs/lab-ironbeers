
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, "/views/partials"));

//-- Fake Data

const beers = [
  {
    name: "San Miguel",
    description: "A beer that you can drink.",
    tagline: "San Miguel is the shittiest beer but you love it!"
  },
  {
    name: "Heineken",
    description: "A beer that comes in a green bottle.",
    tagline: "Getting Americans drunk since a long time ago."
  },
  {
    name: "Corona",
    description: "A beer for when you want to feel like you are in Tijuana.",
    tagline: "Put a lime in it and suck it!"
  },
  {
    name: "Chang",
    description: "Contains an unknown amount of alcohol.",
    tagline: "For when you want to play drunk roulette in Asian hostels"
  }
];

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  const data = {
    allBeers: beers,
  }
  res.render('beers', data);
});

app.get('/random-beers', (req, res, next) => {
    const data = { 
      randomBeer: beers[Math.floor(Math.random() * beers.length)]
     };
      res.render('randombeers', data);
});


app.listen(3000);