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

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  //Call the PunkAPI to get the list of beers
  punkAPI.getBeers()
  //return a promise with the list of beers
  .then(beers => {
    res.render('beers', { beers });
    // console.log(beers[0]);
  }).catch(error => {
    //if there is an error, return an error
    console.log(error);
  });
});

//get a random beer and return random beer page
app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(beer => {
    // console.log(beer);
    res.render('random-beer', { beer });
  }).catch(error => {
    console.log(error);
  }
  );
}
);



app.listen(3000, () => console.log('🏃‍ on port 3000'));
