/******************************/
/*        Static files        */
/******************************/

const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


/******************************/
/*          Routes            */
/******************************/

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials");


/* ------ Home page ------ */
app.get('/', (req, res) => {
  res.render('index');
});

/* ------ Beers page ------ */
app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi);
    res.render('beers', { beersFromApi });
  })
  .catch(error => console.log(error));
}) 

/* ----- Get beer ID ----- */
app.get("/beers/:beerId", (req, res) => {
  punkAPI
  .getBeer(req.params.beerId)
  .then(beersFromApi => {
    res.render('beers', { beersFromApi });
  })
  .catch(error => console.log(error));
})


/* ------ Random beer page ------ */
app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    const random = responseFromAPI[0];
    res.render('randomBeer', {randomBeer: random});
  })
  .catch(error => console.log(error));
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
