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

hbs.registerPartials(path.join(__dirname, '/views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(respond => {
    const beers = []

    respond.forEach(elm => {
      beers.push({
        id: elm.id,
        image: elm.image_url,
        name: elm.name,
        description: elm.description,
        tagline: elm.tagline
      })
    })

    res.render('beers', {beers})
  })
  .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(respond => {

    const [beer] = respond

    res.render('random-beer', {
      image:beer.image_url,
      name: beer.name,
      description: beer.description,
      tagline: beer.tagline,
      foodPairing: beer.food_pairing,
      brewerTips: beer.brewers_tips
    })
  })
  .catch(error => console.log(error));
});

app.get('/beers/:id?', function userIdHandler (req, res) {
  console.log(req.params.id)
  punkAPI
  .getBeer(req.params.id)
  .then(respond => {

    let [beer] = respond

    res.render('beer', {
      image:beer.image_url,
      name: beer.name,
      description: beer.description,
      tagline: beer.tagline,
      foodPairing: beer.food_pairing,
      brewerTips: beer.brewers_tips
    })
  })
  .catch(error => console.log(error));
})
app.listen(3000, () => console.log('🏃‍ on port 3000'));
