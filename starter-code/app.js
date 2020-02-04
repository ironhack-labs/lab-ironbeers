const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
    punkAPI.getBeers()
    .then(beersFromApi => {
        console.log('Beers from the database: ', beersFromApi);
        res.render('beers', {beersFromApi});
    })
    .catch(err => {
        console.error(err);
    })
})

app.get('/random-beer', (req, res) => {
    punkAPI.getRandom()
    .then(randomBeer => {
        console.log('Random beer: ', randomBeer);
        res.render('random-beer', {randomBeer});
    })
    .catch(err => {
        console.error(err);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));