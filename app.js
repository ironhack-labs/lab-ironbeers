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
hbs.registerPartials(__dirname + "/views/partials")
// ...

// Add the route handlers here:

app.get('/', (request, response, next) => {
  return response.render('index');
});


app.get('/beers', (request, response, next) => {

    punkAPI.getBeers()
    .then( (responseFromDB) => {
     console.log('Beers form the database:', responseFromDB) 
     return response.render('beers', {items: responseFromDB})
    })
 
});

app.get('/random-beer', (request, response, next) => {
  punkAPI.getRandom()
  .then( (responseFromAPI) => {
 
    return response.render('random-beer', {beers:responseFromAPI[0]});
   
  })
  .catch ( (error)=> console.log(error));

  
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
