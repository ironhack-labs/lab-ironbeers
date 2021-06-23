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

hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {

  punkAPI.getBeers()
    .then((beersFromApi) => {
    res.render('beers.hbs' , {beers:beersFromApi});
    })
    .catch(() => {
      console.log("Catch")
    });


});

app.get('/random-beer', (req, res) => {
  
  punkAPI.getRandom()
    .then((randomBeer) => {
    res.render('random-beer.hbs' , {random:randomBeer});
    })
    .catch(() => {
      console.log("Catch")
    });

});

app.get('/beers/:id', (req, res) => {
  let id = req.params.id;
  punkAPI.getBeer(id)
    .then((beerById) => {
     
      res.render('beers.hbs' , {beers:beerById});
    })
    .catch(() => {
      console.log("Catch")
    });

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
