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

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => { // beersFromApi ist der Name, den wir der ANTWORT der Api geben (die Antwort ist nun also darin gestored, ist vermutlich ein array)
      res.render('beers', {
        apiBeers: beersFromApi
      }); // hier geben wir dem beersFromApi einen neuen Namen (apiBeers), während wir es in ein Objekt verwandeln
      console.log('Beers from the database: ', beersFromApi)
    })
    .catch(error => console.log(error));
});
app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeerFromApi => {
      res.render('random-beers', {
        randomBeerFromApi:randomBeerFromApi[0]
        
        //ggf hier das [0] wieder rausnehmen
      });
      console.log(randomBeerFromApi)
      console.log('Beers from the database: ', randomBeerFromApi) 
    })
    .catch(error => console.log(error));

});
// app.get('/random-beers', (req, res) => {
//   res.render('random-beers');
// });

app.listen(3000, () => console.log('🏃‍ on port 3000'));