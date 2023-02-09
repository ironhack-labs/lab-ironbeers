const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { getEnabledCategories } = require('trace_events');

const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then((beersFromApi) => {
      console.log('Beers from the database: ', beersFromApi)
      res.render('beers', {beersFromApi: beersFromApi});
    })
    .catch(error => console.log(error))
});

app.get("/random-beers",(req,res) => {
  punkAPI.getRandom()
    .then(randomBeers => {
      console.log('Beers from the database: ', randomBeers)
    res.render("random-beers",{randomBeers: randomBeers[0]})
  }) 
  .catch(error => console.log(error))

});

app.get("/beers/:id",(req,res) => {
  punkAPI.getBeer(req.params.id)
    .then(beer => {
      console.log("Beer:", beer)
    res.render("beer",{beerItem: beer[0]})
    })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
