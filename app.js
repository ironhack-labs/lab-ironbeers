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

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then((beersArr) => {
    console.log(beersArr);
    const data = {
      listOfBeers: beersArr    
    }
    res.render('beers', data)
  })
  .catch(e => {
    console.log(e)
  })
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then((randomBeersArr) => {
      console.log(randomBeersArr);
      const data = {
        beerRandom: randomBeersArr[0]
      }
      res.render('random-beer', data)
    })
    .catch(e => {
      console.log(e)
    })
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
