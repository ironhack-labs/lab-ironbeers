const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials')


// Add the route handlers here:

//Route to beers

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beersFromApi => {
    console.log(beersFromApi)
    res.render('beers.hbs', { beersFromApi});
  })
  .catch(error => console.log(error))
});



app.get('/', (req, res) => {
  res.render('index');
});

app.get('/randomBeers', (req, res) => {
  punkAPI.getRandom()
  .then(responseFromAPI => {
    console.log(responseFromAPI)
    res.render('randomBeers', {responseFromAPI});
  })
  
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
