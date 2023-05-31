const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// route to Home page
app.get('/', (req, res) => { res.render('index');});

//route to beers 
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then((beers) => {
      res.render('beers', { beers });
    })
    .catch((error) => {
      console.log(error);
    });
});

//random beer route
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then((beer) => {
      console.log(beer)
      res.render('random-beer',  beer[0]);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Register the location for handlebars partials here:



app.listen(3000, () => console.log('🏃‍ on port 3000'));
//
////
/////////