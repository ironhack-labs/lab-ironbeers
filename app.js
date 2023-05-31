const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get("/", (req, res, send) => {

  const basics = {
      imageFile: 'beer.png',
  };

  res.render("index", basics);
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beers => {
    const beerData = beers.map(beer => ({
      id: beer.id,
      image: beer.image_url,
      name: beer.name,
      tagline: beer.tagline,
      description: beer.description,
      food_pairing: beer.food_pairing,
      brewers_tips: beer.brewers_tips
    }));
    res.render('beers', { beers: beerData });
  })
  .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(beers => {
    const beerData = beers.map(beer => ({
      id: beer.id,
      image: beer.image_url,
      name: beer.name,
      tagline: beer.tagline,
      description: beer.description,
      food_pairing: beer.food_pairing.map(pairing => `- ${pairing}`),
      brewers_tips: beer.brewers_tips
    }));
    res.render('random-beer', { beers: beerData });
  })
  .catch(error => console.log(error));
});

app.get('/beer/:beerId', (req, res) => {
  const beerId = req.params.beerId;
  punkAPI
  .getBeer(beerId)
  .then(beer => {
    const beerData = {
      id: beer[0].id,
      image: beer[0].image_url,
      name: beer[0].name,
      tagline: beer[0].tagline,
      description: beer[0].description,
      food_pairing: beer[0].food_pairing.map(pairing => `- ${pairing}`),
      brewers_tips: beer[0].brewers_tips
    };
    res.render('beer', { beer: beerData });
  })
  .catch(error => console.log(error));
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
