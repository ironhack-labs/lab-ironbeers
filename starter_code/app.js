// require all the packages you install
const express = require('express');
const app = express();
// package that allows templating and dynamic views
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

// sets hbs as default view engine
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


// in order to use the PARTIALS I have to REGISTER them!
// partials are used to avoid repeating code
hbs.registerPartials(__dirname + '/views/partials');


// routes:

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  // .getBeers => is method we get from punkAPI
  punkAPI.getBeers()
  // responseFromDB is just a placeholder, can be any word
  .then(responseFromDB => {  // =======================> ".this()" holds success callback
    // console.log("Response is: ", responseFromDB); <-working well!
                          // we are renaming responseFromDB to allBeers variable
                          // which we'll use in the views
    res.render('beers-info', { allBeers:responseFromDB });
  })
  .catch(error => {  // ===============================> ".catch()" is failure callback
    console.log(error)
  })
});

app.get('/randomBeers', (req, res, next) => {
  // .getRandom() is method given by punkAPI
  punkAPI.getRandom()
  .then(someResponse => {
    console.log("some response =========> ", someResponse[0]);
    res.render('randomBeers', { randomBeer:someResponse[0] });
  })
  .catch(error => {
    console.log(error)
  })
});

app.listen(3000, () => console.log("Listening IronBeers on 3000."));
