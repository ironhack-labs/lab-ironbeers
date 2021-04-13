const express = require('express');

const hbs = require('hbs');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + '/views/partials')

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then((beerlist)=>{
      res.render('beers', {beers: beerlist}) 
    })
    .catch((error)=>{
      throw new Error(error)
    })
});
app.get('/random', (req, res) => {
  punkAPI
    .getRandom()
    .then((beer)=>{
      res.render('random', beer[0]);
    })
    .catch((error)=>{
      throw new Error(error)
    })
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
