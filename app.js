const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(`${__dirname}/views/partials/`)

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/beers', (req, res) => {
    punkAPI.getBeers()
           .then(beersFromApi =>  res.render('beers', { partialBeer: beersFromApi }))
           .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
    const randomBeer = punkAPI.getRandom()
                              .then(responseFromAPI => res.render('random-beer', { randomPartial: responseFromAPI }))
                              .catch(error => console.log(error));
    return randomBeer
});

app.get('/beers/:id', (req, res) => {
    punkAPI.getBeer(1)
           .then(elm =>  res.render('beers', { partialBeer: elm }))
           .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
