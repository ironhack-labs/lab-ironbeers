const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(path.join(__dirname, "/views/partials"));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index', { title: "IronBeers" }));

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi)
    res.render('beers', { beersFromApi, title: "Beers" })
  })
  .catch(error => console.log(error));
});

app.get('/beers/:beerId/', (req, res, next) => {
  res.send(req.params)
})

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log(responseFromAPI);
    res.render('random-beer', { responseFromAPI, title: "Random Beers" });
  })
  .catch(error => console.log(error));
}); 

app.get('/individual', (req, res) => res.render('individual', { title: "Each Beer" }));

app.listen(3000, () => console.log('🏃‍ on port 3000'));
