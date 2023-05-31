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
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers(1)
    .then((beersArr) => {
      const data = {
        listOfBeers: beersArr
      }
      res.render("beers", data);
    })
    .catch((error) => {
      console.log("There was an error", error)
    });
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then((randomBeer) => {
      const data = {
        listOfBeers: randomBeer
      }
      res.render("random-beer", data);
    })
    .catch((error) => {
      console.log("There was an error", error)
    });
});

app.get('/beer/:id', (req, res) => {
console.log(req.params)

  punkAPI.getBeer(req.params.id)
  .then((beerId) => {
    const data = {
      listOfBeers: beerId
    }
    res.render("beer-id", data)
  })
  .catch((error) => {
    console.log("There was an error", error)
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
