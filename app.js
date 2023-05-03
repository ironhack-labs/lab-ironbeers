// Requiring npm Packages
const express = require('express');
const hbs = require('hbs');

// Creating an Express Server
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');


const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//Static FIles Location Configuration (Public folder)
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
//.
// Add the route handlers here:

//Home route
app.get('/',(request, response)=>{
  response.render('index');
});

//Beer route
app.get('/beers', (request, response) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => { 
   console.log('Beers from the database:', beersFromApi);
   response.render('Beers', {beersFromApi});
 })
   .catch(error => console.log(error));

});

//Random Beer Route

app.get('/randombeer', (request, response) => {
  punkAPI.getRandom().then(beersFromApi => { console.log('Beers from the database:', beersFromApi);
   response.render('randombeer', {beersFromApi});
 })
   .catch(error => console.log(error));

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
