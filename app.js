const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials 
hbs.registerPartials(path.join(__dirname, "views", "partials"))


// Add the route handlers 

app.get('/', (req, res) => {
  res.render('index')
});

app.get("/beers", (req, res) => {

  //Get the array of all the beer
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render("beers", { beersFromApi }))
    .catch(error => console.log(error));


})

app.get('/beers/:id', (req, res) => {
  // Get the beer page using the id. The link is created from /beers, using the id

  // Selected the beer with the same id that the beer clicked
  punkAPI.getBeer(req.params.id).then(beersFromApi => {
    // Create the page using the /beers page as base/parent, but with only one object of the array
    res.render("beers", { beersFromApi });
  })
  .catch(error => console.log(error))
})

app.get("/random-beers", (req, res) => {
  // Get a random beer
  punkAPI
    .getRandom()
    .then(randomBeer => res.render("random-beers",  randomBeer[0] ))
    .catch(error => console.log(error));
  
})



app.listen(3000, () => console.log('*Emoji*‍ on port 3000'));
