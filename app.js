const express = require('express');
const res = require('express/lib/response');

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

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", (req, res) => {
  punkAPI
  .getBeers()
  .then((beersFromApi) => {//console.log('Beers from the database: '//, beersFromApi);
  let myBeers = beersFromApi;
  
  res.render("beers", {beers: myBeers});

  console.log("it works")

})
  
  

  .catch(error => console.log(error));
  
});

app.get("/random-beer", (req, res) => {
punkAPI
  .getRandom()
  .then(responseFromAPI => {
    // your magic happens here
console.log(responseFromAPI)
res.render("random-beer", {randomBeer: responseFromAPI});

}

  )
  .catch(error => console.log(error));

});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
