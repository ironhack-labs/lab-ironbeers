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

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

//beers route handler:
app.get('/beers', (req, res) => {
  const beers = punkAPI.getBeers();
  beers.then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi);
    res.render('beers', {
      beersFromApi
    });
  });
  beers.catch(error => console.log(error));
});

//ramdom-beers route handler:
app.get('/random-beer', (req, res) => {
  const beer = punkAPI.getRandom();
  beer.then(responseFromAPI => {
    // your magic happens here
    console.log('Beers from the database: ', responseFromAPI);
    res.render('random-beer', {
      responseFromAPI
    });

  });
  beer.catch(error => console.log(error));
});

//specific beer
app.get("/beers/beer-:id", (req, res, next) => {
  const beerid = punkAPI.getBeer(req.params.id);
  beerid.then(responseFromAPI => {
    // your magic happens here
    console.log('Beers from the database: ', responseFromAPI);
    res.render('random-beer', {
      responseFromAPI
    });

  });
  beerid.catch(error => console.log(error));
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));