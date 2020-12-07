const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//creates a shortcut to public folder - index.hbs line 2 only needs ./images/beer.png
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  // render it to where? index.hbs
  //route handlers return a promise?
  res.render('index'); //shows localhost:3000 (home page)
});

app.get('/beers', (req, res) => {
  // create a beer route inside the app.js file
  //res.render('beers'); shows localhost:3000/beers ** I can't render twice - this was uncommented which is what prevented me from showing my beers in my browser
  punkAPI
    .getBeers() //calling the .getBeers() method returns a PROMISE that should be resolved with an array of 25 beers
    .then(beersFromApi => {
      //this is my promise, I want to get my beers
      //console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { beersFromApi }); // then I want to render them inside my beers.hbs
    })
    .catch(error => console.log(error)); //if it doesn't work, throw an error
});

app.get('/random-beer', (req, res) => {
  //route handlers return a promise?
  //res.render('random-beer'); shows localhost:3000/random-beers
  //const randomBeer =
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('random-beer', { responseFromAPI });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
