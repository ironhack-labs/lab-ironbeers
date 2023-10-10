const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/random-beer', async (req, res) => {
  try { 
    const getmyRandomBeer = await punkAPI.getRandom();
    const randomBeer = getmyRandomBeer.map((beer) => {
      return {
        name: beer.name,
        image: beer.image,
        description: beer.description,
        tagline: beer.tagline,
        foodpairing: beer.foodpairing,
        brewertips: beer.brewertips
      }
    })
    res.render('random-beer', { getmyRandomBeer: randomBeer });
} catch(error) {
  console.log(error);
}
})

app.get('/beers', async (req, res) => {
  try {
    const beers = await punkAPI.getBeers();
    const firstTwentyFive = beers.slice(0, 25).map((beer) => {
      return {
        name: beer.name,
        image: beer.image,
        description: beer.description,
        tagline: beer.tagline
      };
    });
    res.render('beers', { beers: firstTwentyFive });
  } catch (error) {
    console.log(error);
  }
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(5000, () => console.log('🏃‍ on port 5000'));
