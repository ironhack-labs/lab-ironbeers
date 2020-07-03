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
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  // go get the beers
  try {

    const allBeers = await punkAPI.getBeers();
    //console.log('ITERATION 3 - ALL BEERS >>>>>');
    //console.log('>>> Beers from the database: ', allBeers);
    
    // render the page w/ the generated beers array
    res.render('beers', { allBeers }); // { } because allBeers is an array and render only takes an object argument

  } catch (err) {
    console.log(err);
  }
});

app.get('/random-beers', async (req, res) => {
  try {

    const apiResult = await punkAPI.getRandom();
    
    console.log('ITERATION 4 - RANDOM BEER >>>>>');
    console.log('>>> Random beer from the database: ', apiResult);
    
    //apiResult is an array so get the only element or it :
    const randomBeer = apiResult[0];
    res.render('random-beers', randomBeer);

  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
