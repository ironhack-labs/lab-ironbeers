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

// itiration 3
app.get('/beers', async (req, res) => {
  // const beersFromApi = await punkAPI.getBeers();
  // res.render('beers', { beersFromApi });
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { beersFromApi });
    })
    .catch(error => console.log(error));
});

//Iteration 4
app.get('/random-beers', async (req, res) => {
  const randomResponseFromAPI = await punkAPI.getRandom();
  res.render('random-beers', { randomResponseFromAPI });
  // punkAPI => THIS STRUCTURE DOESN'T WORK. IT'S VERY SLOW AND EVENTUALLY FAILS. I DON'T UNDERSTAND WHY!!!!!!!!!!!!!!!
  //   .getRandom()
  //   .then(randomResponseFromAPI => {
  //     console.log('Random beer here: ', randomResponseFromAPI);
  //     res.render('random-beers', { randomRresponseFromAPI });
  //   })
  //   .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
