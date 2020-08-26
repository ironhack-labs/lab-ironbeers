const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//partials
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

//beer list route
app.get('/beers', (req, res) => {
  let data;
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      data = beersFromApi;
      console.log(data[0]);
      res.render('beers', { data });
    })
    .catch(error => console.log(error));
});

//random beer route
app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      let random = responseFromAPI;
      // your magic happens here
      res.render('randomBears', { random });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
