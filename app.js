/**
 * TOC Express dynamic views
 * 
 * 1. require hbs
 * 2. Set the View Engine
 * 3. app.all() with the res.render() method
 * 4. set the views directory to tell express where templated are
 * 5. require the data for the page
 * 6. Pass data to the res.render() method
 * 7. Register the partials directory
 */

 const express = require('express');

 // 1. require hbs
 const hbs = require('hbs');
 const path = require('path');
 
 //5. require the data for the page
 const PunkAPIWrapper = require('punkapi-javascript-wrapper');
 
 const app = express();
 const punkAPI = new PunkAPIWrapper();
 
 //2. Set the View Engine
 app.set('view engine', 'hbs');
 
 //4. set the views directory to tell express where templated are
 app.set('views', path.join(__dirname, 'views'));
 
 app.use(express.static(path.join(__dirname, 'public')));
 
 // Register the location for handlebars partials here:
 // 7. Register the partials directory
 hbs.registerPartials(path.join(__dirname, 'views/partials'));
 
 // Add the route handlers here:
 
// Iteration 2
//3. app.all() with the res.render() method
app.all('/', (req, res) => {
res.render('index');
});

// Iteration 3
app.all('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi);

    // 6. Pass data to the res.render() method
    res.render("beers", {beers: beersFromApi})
  } )
  .catch(error => console.log(error));})
 
 
  // Iteration 4
  app.all('/random-beer', (req, res) => {
    punkAPI
    .getRandom()
    .then(oneBeerFromApi => {
      console.log('One random Beer from the database: ', oneBeerFromApi);
  
      // 6. Pass data to the res.render() method
      res.render("randomBeer", {beer: oneBeerFromApi[0]})
    } )
    .catch(error => console.log(error));})

// Iteration 6
app.all('/beers/beer-:id', (req, res) => {
  const beerId = req.params.id
  punkAPI
  .getBeer(beerId)
  .then(idBeerFromApi => {
  console.log('One Beer from the Id in database: ', idBeerFromApi);

  // 6. Pass data to the res.render() method
  res.render("randomBeer", {beer: idBeerFromApi[0]})
   } )
  .catch(error => console.log(error));})
 
 
 app.listen(3000, () => console.log('🏃‍ on port 3000'));
 