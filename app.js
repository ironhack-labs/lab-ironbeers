const { response } = require('express');
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
  punkAPI
  // gets the array of 25 beers
    .getBeers()
    // it all needs to happen in the .then which is the response
    // response = beersFromAPI
    .then(beersFromApi => { 
      console.log('Beers from the database: ', beersFromApi); 
      res.render('beers', {beersFromApi})
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    // it all needs to happen in the .then 
    .then(responseFromApi => {
      const theBeer = responseFromApi[0];
      console.log('Random beer appears', responseFromApi[0].name);
      // alert(responseFromApi[0].name)
      res.render('random-beer', theBeer)
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
