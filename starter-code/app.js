const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));

// app.get('/beers', (req, res) => res.render('beers'))

app.get("/beers", (request, response) => {
  punkAPI
    .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi)
    response.render("beers.hbs", { beers: beersFromApi })
  })
  .catch(error => console.log(error));
});

// app.get('/randombeers', (req, res) => res.render('randombeers'));

// random beer 

app.get("/randombeers", (request, response) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log('Beers from the database: ', responseFromAPI)
      response.render("randombeers.hbs", { randombeers: responseFromAPI })
    })
    .catch(error => console.log(error));
});






// const randomBeer = punkAPI.getRandom()

// app.get("/randombeers", (request, response) => {
//  punkAPI
//  randomBeer.then(randombeer => {
//    console.log(beer[0].name)
//  })

  app.listen(3000, () => console.log('🏃‍ on port 3000'));




//Recipe.create(myRecipe)
//  .then((dbRes) => {
//    console.log(dbRes)
//  }).catch((dbErr) => {
//    console.log(dbErr)
//  })

//.getBeers()
//.then((beersFromApi) => {
//  console.log('Beers from the database: ', beersFromApi)
//})
//.catch(error) => {
//  console.log(error)
//});
