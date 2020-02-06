const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

const PORT = 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get('/beers', (req,res) => {
    punkAPI.getBeers()
    .then(beersFromApi => {
        console.log('Beers from the database: ', beersFromApi);
        res.render('beers', {beersFromApi})
    })
    .catch(error => console.log(error));
});

app.get('/random-beers', (req,res) => {
    punkAPI.getRandom()
    .then(randomBeerFromApi => {
        console.log('Random beer from the database: ', randomBeerFromApi);
        res.render('random-beers', {randomBeerFromApi})  // {} because it is an object with properties
    })
    .catch(error => console.log(error));
});

// to get each seperate beer and save it in a variable
app.get('/beers/:beerId', (req, res) => {
    console.log('req.params', req.params);
    console.log('req.params.beerId', req.params.beerId);

    const beerId = req.params.beerId;
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
