const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// Add the route handlers here:
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then( beersFromApi => {
      res.render('beers', {beers: beersFromApi})
      //another sol:
      //res.render('beers', {beers: beersFromApi})
    }) 
    .catch(err => console.log(err)); 
});

// Bonus: Iteration 6
app.get("/beers/beer-:id", (req, res) => {
  const id = req.params.id;
  punkAPI
    .getBeer(id)
    .then(beers => {
      console.log(beers)
        res.render("beers", {singleBeer: beers[0]})
    })
    .catch(error => console.log(error));
})

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then( beers => {
      beers[0].random = true;
      // console.log(beers[0]);
      res.render("random-beer", {beer: beers[0]})
    })
    .catch(err => console.log(err));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
