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
hbs.registerPartials(path.join(__dirname, 'views/partials'))

// ...



// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
  //res.send('index');
});




app.get('/beers', (req, res) => {
punkAPI
  .getBeers()
  .then(beersFromApi => {
    res.render('beers-page', {beers: beersFromApi});
    //res.send('beers-page');
    console.log('Beers from the database: ', beersFromApi)
  })
  .catch(error => console.log(error));
});





app.get('/random-beer', (req, res) => {
punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log('Random-beers from the database: ', responseFromAPI)
    res.render('randombeer-page', {randombeer: responseFromAPI});
    //res.send('randombeer-page');
  })
  .catch(error => console.log(error));

});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
