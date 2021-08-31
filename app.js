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

hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get ("/beers", (req,res) => {
    /*Inside the /beers route, call the getBeers() method (
      the PunkAPI provides this method, and you can find more about it here). 
      Calling the .getBeers() method returns a promise that should be resolved with an array of 25 beers. */
    punkAPI
      .getBeers()
      .then(beersFromApi => res.render("beers", { beersFromApi }))
      .catch(error => console.log(error));

})

app.get ("/random-beer", (req,res) => {
  res.render("random-beer")
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
