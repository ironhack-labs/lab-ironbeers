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
// ignore partials for now
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

//Create a /beers route inside the app.js file.
app.get('/beers', (req, res) => {
  // console.log(punkAPI.getBeers());
  // .getBeers is a promise, and so it has a then and catch method
  punkAPI
    .getBeers()
    .then(dataBack => {
      // console.log('dataBack:', dataBack);
      // render the response (response.render())
      // hover over the render function to learn more
      res.render('beers', { beers: dataBack });
    })
    .catch(err => {
      console.log(err);
    });
});

//Let's create the /random-beer route.
app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(dataBack => {
      console.log('dataBack:', dataBack[0]);
      // first arguement of render is the hbs file coming from views folder root, the object is then named as you would like it
      res.render('random-beers', { randomBeer: dataBack[0] });
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
