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

hbs.registerPartials(__dirname + "/views/partials")

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', async (req, res) => {
  try {
    const beers = await punkAPI.getBeers();
    const firstTwentyFiveBeers = beers
      .map((beer) => {
        return {
          name: beer.name,
          tag: beer.tagline,
          description: beer.description,
          image: beer.image_url,
        }
      }).slice(0, 25)
    console.log(firstTwentyFiveBeers);


    res.render('beers.hbs', {
      arrayOfBeers: firstTwentyFiveBeers
    });
  } catch (error) {
    console.log(error);
  }
});
app.get('/random-beer', async (req, res) => {
  try {
    const beer = await punkAPI.getRandom();
    console.log(beer)

    const data = {
      name: beer[0].name,
      tag: beer[0].tagline,
      description: beer[0].description,
      image: beer[0].image_url,
      food_pairing: beer[0].food_pairing,
      brewers_tips: beer[0].brewers_tips,
    }
    console.log(data)
    res.render('random-beer.hbs', data);
  } catch (error) {
    console.log(error);
  }

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
