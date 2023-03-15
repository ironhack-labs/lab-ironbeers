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
hbs.registerPartials(__dirname + 'views/partials/'); //tell HBS which directory we use for partials
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('home');
});



app.get('/beers', (req, res) => {
  punkAPI
    .getBeers().then((beersFromApi)=>{
      console.log('Beers from the database: ', beersFromApi);
     res.render('beers',{beers: beersFromApi});
    })

    .catch(error => console.log(error));
});



app.get('/description', (req, res) => {
  punkAPI
    .getBeers().then((beersFromApi)=>{
      console.log('description from the database: ', beersFromApi);
     res.render('beers',{description: beersFromApi});
    })

    .catch(error => console.log('description', error));
});

app.get('/image', (req, res) => {
  punkAPI
    .getBeers().then((beersFromApi)=>{
      console.log('image from the database: ', beersFromApi);
     res.render('beers',{image_url: beersFromApi});
    })

    .catch(error => console.log('description', error));
});


app.get('/tagline', (req, res) => {
  punkAPI
    .getBeers().then((beersFromApi)=>{
      console.log('image from the database: ', beersFromApi);
     res.render('beers',{tagline: beersFromApi});
    })

    .catch(error => console.log('description', error));
});


app.get('/random-beer', (req, res) => {
  let beerData = {};
  punkAPI.getRandom()
  .then(randomBeer =>{
    beerData = {
      beers: randomBeer
    }
     res.render('random-beer', beerData.beers[0]);
    })

  .catch(error => console.log(error));
  });

app.listen(3000, () => console.log('🏃 on port 3000'));



