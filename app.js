const express = require('express');
const app = express();

const hbs = require('hbs');

const path = require('path');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
  res.render('index');
  res.render('home');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers().then((beers) => {
    console.debug(beers);
    res.render('beers', {beers: beers});
  })
});


//codigo julio
//app.get('/random-beer', (req, res) => {
 // punkAPI.getRandom().then(beer => {
 //   console.log(beer)
 //   res.render('beer-detail', beer)
 //   res.render('random-beer', {beers: beers});
//  })
//})




app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
