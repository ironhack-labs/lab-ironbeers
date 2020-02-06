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

app.set('views', path.join(__dirname, 'views'))                         // Views directory setup
app.set('view engine', 'hbs')                                           // View engine setup

hbs.registerPartials(path.join(__dirname, 'views/partials'))         // Partials setup

// add the routes here:

app.get('/', (req, res) => res.render('index'));
app.get('/beers', (req, res) => {
    punkAPI.getBeers()
        .then(beersFromApi => res.render('beers', { allBeers: beersFromApi }))
        .catch(error => console.log(error));
});
app.get('/randomBeers', (req, res) => {
    punkAPI.getRandom()
        .then(responseFromAPI => res.render('randomBeers', { responseFromAPI }))
        .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
