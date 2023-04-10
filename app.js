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

app.get('/beers', async (req, res) => {
  try {
    const allBeers = await punkAPI.getBeers();
    // console.log(allBeers);
    res.render('beers', {allBeers});
  }
  catch (err) {console.log("There was an error", err)}
});


app.get('/random-beer', async (req, res) => {
  try {
    const randomBeer = await punkAPI.getRandom();
    // console.log(randomBeer);
    res.render('random-beer', {randomBeer});
  }
  catch (err) {console.log("There was an error", err)}
});

app.get('/beer/:id', async (req, res) => {
    const id = req.params.id;
    punkAPI.getBeer(id)
    .then(function(beer) {
      res.render('newbeer', { beer});
    })
  }
 
);


// res.render('newbeer', { beer: beer[0] });


app.listen(3000, () => console.log('🏃‍ on port 3000'));
