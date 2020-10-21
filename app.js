const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", (req, res, next) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi)
    res.render('beers', {beersFromApi});
  })
  //el catch es posa fora, un cop acabat el then
  .catch(error => console.log(error));
  });


app.get("/randomBeer", (req, res, next) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log('A random beer from database: ', responseFromAPI)
    res.render('randomBeer', {responseFromAPI}); 
  })
  .catch(error => console.log(error));
 });


app.listen(3000, () => console.log('🏃‍ on port 3000'));
