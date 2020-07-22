const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

const getBeers = async () => {
  
};

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

//

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers',async (req, res, next) => {
    try {
      let beersArray = await punkAPI.getBeers();
      res.render('beers', {beers: beersArray})
    } catch (error) {
      console.log(error);
    }
  });


app.get('/random-beers', async (req, res) => {
  try {
    let randomBeer = await punkAPI.getRandom();
    console.log(randomBeer)
    res.render('random-beers', {ranBeer: randomBeer});

  } catch (error) {
    console.log(error)
  }


});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
