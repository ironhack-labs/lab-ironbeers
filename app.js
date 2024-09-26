// ---------- [INITIAL SETUP] ----------

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

// ---------- [INDEX PAGE RENDERING] ----------

app.get('/', (req, res) => {
  res.render('index');
  console.log("you entered home page")
});


// ---------- [BEERS PAGE RENDERING] ----------

app.get('/beers', (req, res) => {

  //res.render('beers');

  punkAPI
    .getBeers()
    //.then(beersFromApi => console.log('Beers from the database: ', beersFromApi))

    .then(beersFromApi => {

      res.render('beers', { beers: beersFromApi })

    })
    .catch(error => console.log(error));

  console.log("you entered beers page")

})


// ---------- [RANDOM BEER PAGE RENDERING] ----------

app.get('/random-beer', (req, res) => {

  //res.render('random-beer');


  punkAPI
    .getRandom()
    //.then(responseFromAPI => { // your magic happens here})
    .then(responseFromAPI => {

      res.render('random-beer', { randomBeer: responseFromAPI })

    })

    .catch(error => console.log(error));

  console.log("you entered random-beer page")
})


// ---------- [PORT SETUP] ----------

app.listen(5005, () => console.log('🏃‍ on port 5005'));
