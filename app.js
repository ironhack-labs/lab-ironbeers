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
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  let beers = []
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    beers = beersFromApi
    res.render('beers',{ beers })
  })
  .catch(error => console.log(error));
  
  
});

app.get('/beers/:beer', (req, res) => {
  let beer = req.params.beer;
  console.log(beer)
  if(beer == 'random'){
    punkAPI
    .getRandom()
    .then(responseFromAPI => {
      // your magic happens here
      beer = responseFromAPI[0]
      res.render('beer',{ beer })
    })
    .catch(error => console.log(error));
  }else{
    punkAPI
    .getBeer(beer)
    .then(responseFromAPI => {
      // your magic happens here
      beer = responseFromAPI[0]
      res.render('beer',{ beer })
    })
    .catch(error => console.log(error));
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
