const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(__dirname + '/views/partials')

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:
app.get('/', (req, res, next) => {
  res.render('index')
})

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beersFromApi => {
    res.render('beers',{beers: beersFromApi} );

  })
  .catch(error => console.log(error));
})


app.get('/random-beer', (req, res, next) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render('random-beer',{beer: responseFromAPI[0]})
  })
  .catch(error => console.log(error));
})


// BEER BY ID
app.get('/beer/:id', (req, res, next) => {
  const beerId = req.params.id
  punkAPI
  .getBeer(beerId)
  .then(beer => {
    // console.log(beer[0])
    console.log(beer[0])
    res.render('random-beer', { beer: beer[0]});
  })
  .catch(error => console.log(error));
});


// 404
app.use((req, res, next) => {
  res.status(400)
  res.render('error', {title: '404 Error'})
})



app.listen(3000, () => console.log('🏃‍ on port 3000'));
