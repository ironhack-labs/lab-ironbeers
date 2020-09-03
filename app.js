const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...
app.get("/beers/:id", (req, res)=>{
  console.log(req.params.id);
  punkAPI
  .getBeers()
  .then(beersFromApi => {      
    res.render("clickedbeer", {
      clickedBeer: beersFromApi.find(beer => beer.id == req.params.id)
    })
  })
  .catch(error => 
    console.log(error))
})
// Add the route handlers here:
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi =>       
      res.render("beers", {beers: beersFromApi})
      )
    .catch(error => 
      console.log(error))

});
app.get('/randombeers', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render("random-beer", {randomBeer: responseFromAPI})
  })
  .catch(error => console.log(error));       


});
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
