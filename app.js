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
//route for the beers page
app.get('/beers', (req, res) => {
  //create an object which we are going to use
  const beerObj = punkAPI.getBeers()
  //after getting all bears - let's show them on the page
  beerObj
    .then(beers => {
      res.render('beers', {beers})
    })
    .catch(error => {
      console.log(error)
    })
   
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
