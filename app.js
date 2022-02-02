const express = require('express');

const hbs = require('hbs');
const { Http2ServerRequest } = require('http2');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, "views/partials"));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.use('/beers', (req, res) => {  
  if (req.path === '/') {
    punkAPI.getBeers()
    .then((beersFromApi) => {
      res.render('beers', {beers: beersFromApi});
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    const beerId = parseInt(req.path.replace("/beer", ""));
    punkAPI.getBeer(beerId)
    .then((specificBeer) => {
      res.render('beer-info', {beer: specificBeer[0]});
    })
    .catch((err) => {
      console.log(err);
    });
  }
});



app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then((randomBeer) => {
    console.log(randomBeer[0])
    res.render('random-beer', {beer: randomBeer[0]});
  })

  .catch((err) => {
    console.log(err);
  });
  
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
