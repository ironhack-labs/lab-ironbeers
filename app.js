const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(path.join(__dirname, 'views/partials'))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

//Beers handler:
app.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render("beers", {
        beersData: beersFromApi
      })
    })
    .catch(error => console.log(error))
})

//Random beer handler:
app.get("/random-beer", (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render("randomBeer", {
        beerData: responseFromAPI
      })
    })
    .catch(error => console.log(error))
})
//Unique beer handler
app.get("/beers/:id", (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then(beerResponse => res.render("randomBeer", {
      beerData: beerResponse
    }))
    .catch(error => console.log(error))
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));