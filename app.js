const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(__dirname + '/views/partials')

// prints out all the beers here using the functions from the API

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

// put async before function call
app.get('/beers', async (req, res) => {
  let beersFromApi = await punkAPI.getBeers()
    res.render('beers', {apiBeers: beersFromApi});
    console.log('Beers from the database: ', beersFromApi)
});

app.get('/random-beer', async (req, res) => {
  let responseFromAPI = await punkAPI.getRandom()
    res.render('random-beers', {randomBeer: responseFromAPI});
    console.log('Random beer: ', responseFromAPI)
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
