const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');


const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));  // because of this you won't need /views bc it recognises it (HTML)

app.use(express.static(path.join(__dirname, 'public')));// because of this you won't need /public bc it recognises that it's a static  (image, fonts, etc)

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});





app.get('/beers', (request, response) => {

  punkAPI
    .getBeers()
    .then(beers => response.render('beers', { beers }))
      // console.log('Beers from the database: ', beersFromApi)
    // response.render('beers', { beers })}) //don't need dirname 
    .catch(error => console.log(error));
});


app.get('/random-beers', (request, response) => {
  punkAPI
    .getRandom()
    .then(randomBeers => response.render('random-beers', { randomBeers }))
      // console.log('Beers from the database: ', beersFromApi)
    // response.render('beers', { beers })}) //don't need dirname 
    .catch(error => console.log(error));
});


hbs.registerPartials(path.join(__dirname, 'views/partials')); // to register where the partials will be located

app.listen(3000, () => console.log('🏃‍ on port 3000'));