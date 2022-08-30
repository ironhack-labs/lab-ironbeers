const { Console } = require('console');
const express = require('express');

const hbs = require('hbs');
const { request } = require('http');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const beer = [];
app.get('/', (_request, response) => {
  response.render("index");
});
app.get("/beers", (_request, response) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      response.render('beers', { beersFromApi });
     // console.log("beers from the database:", { beersFromApi });
       
      })
    .catch(error => console.log(error));
});
  


app.get("/random-beers", (_request, response) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
     // console.log("holaaaaaaaa", responseFromAPI)
      response.render('random-beer', { responseFromAPI });
    })
    .catch(error => console.log(error));

});
  
// ...

// Add the route handlers here:



app.listen(3000, () => console.log('🏃‍ on port 3000'));
