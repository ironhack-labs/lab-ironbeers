const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, './views/partials'));

hbs.registerPartials(__dirname + '/views/partials');
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => { 
  punkAPI.getBeers()
  .then(beers=>{console.log('Beers from the database:', beers);res.render('beers',{beers})});
});


app.get('/beers/beer/:id', (req, res) => { 
  punkAPI.getBeers(req.params.id)
  .then(onebeer=> res.render('beer', onebeer[0]));
});


app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
  .then(beerRandom=>{
    res.render('random-beers',{beerRandom});
  }) 
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
