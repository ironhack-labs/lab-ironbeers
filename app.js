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

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers().then(beersFromApi => {
    res.render('beers', { beersInfo: beersFromApi })
  })

});


app.get('/random-beer', (req, res) => {
  punkAPI.getRandom().then(responseFromAPI => res.render('random-beer', { beersInfo: responseFromAPI }))
});

app.get('/beer/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log(id)
  punkAPI.getBeer(id).then(beersFromApi => {
    console.log(beersFromApi);
    res.render('beer', { beer: beersFromApi[0] })
  })

});







app.listen(3000, () => console.log('🏃‍ on port 3000'));
