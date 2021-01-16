const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

hbs.registerPartials(path.join(__dirname, '/views/partials'));

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});


app.get('/beers', (req, res, next) => {
  const beers = punkAPI.getBeers()
  .then((beers) =>{
    res.render('beers.hbs', {beers})
  })
  .catch((err) => console.error(err))
  
})


app.get('/random-beers', (req, res, next) => {
  const randomBeer = punkAPI
  .getRandom()
  .then((randomBeer)=>{
    res.render('random-beer.hbs', randomBeer[0]);
    console.log(randomBeer[0])
  })
  .catch((err) => console.error(err))
})


app.listen(3004, () => console.log('🏃‍ on port 3000'));
