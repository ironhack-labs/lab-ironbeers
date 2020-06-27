const express        = require('express');
const hbs            = require('hbs');
const path           = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

//-------------------------------------------------------
const app = express(); 
const punkAPI = new PunkAPIWrapper();
const randomBeer = punkAPI.getRandom()

//-------------------------------------------------------


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res, next) => {
  res.render('index');
});


app.get('/beers', (req, res, next) => {
  
  punkAPI.getBeers()
  .then(
    PunkAPIWrapper => {
    //  console.log(PunkAPIWrapper)
      res.render('beers', { beers: PunkAPIWrapper})})
  .catch(error => console.log(error));

});


app.get('/random-beer', (req, res, next) => {
  
    punkAPI.getRandom()
      .then(beer => {
        //console.log(beer);
        res.render('random-beer', beer[0]);
      })
      .catch(error => {
        console.log(error)
      })
  });


app.listen(3000, () => console.log('🏃‍ on port 3000'));