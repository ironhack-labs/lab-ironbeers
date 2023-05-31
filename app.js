const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(responseFromAPI => {
      const data = {
        beers: responseFromAPI
      };
      console.log(data);
      res.render('beers', data);
    })
    .catch(error => {
      console.log('error', error);
    });
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      const data = {
        beer: responseFromAPI
      };
      res.render('random-beer', data);
    })
    .catch(error => {
      console.log('error', error);
    });
});

// now we are defining a new route called beerdetails
// and we are dynamically passing the ID with the colon (:)

app.get('/beerdetails/:id', (req, res) => {
  //res.send(req.params);
  // if we do a console log, we can see the request params
  //console.log(req.params);

  punkAPI
    // when calling GetBeer, we can pass in the ID, but we should use the req.params.id variable to ensure we pass in the correct one (dynamically)
    .getBeer(req.params.id)
    .then(responseFromAPI => {
      const data = {
        beer: responseFromAPI
      };
      // console.log(data);
      res.render('beerdetails', data);
    })
    .catch(error => {
      console.log('error', error);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
