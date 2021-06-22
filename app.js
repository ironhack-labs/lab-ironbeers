const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


hbs.registerPartials(`${__dirname}/views/partials`)


app.get('/', (req, res) => {
  const object = { photo: "/images/beer.png" }

  res.render('index', object);
});

app.get('/beers', (req, res) => {
  //  const object = { photo: "/images/beer.png" }

  punkAPI
    .getBeers().then(beersFromApi => res.render("beers", { beersFromApi }))
    .catch(error => console.log(error));
});


app.get('/random-beer', (req, res) => {
  //const object = { photo: "/images/beer.png" }

  punkAPI.getRandom().then(randomBeer => res.render('randombeer', randomBeer[0]))
    .catch(error => console.log(error));

});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
