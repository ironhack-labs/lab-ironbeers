const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
    punkAPI
        .getBeers()
        .then(beers => {
        res.render('beers', { beers: beers });
        console.log('Beers from the database: ', beers);
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
    punkAPI
        .getRandom()
        .then(beer => {
            res.render('randomBeer', { beer: beer });
        })
        .catch(error => console.log(error));
});

app.get('/beers/:beerId', (req, res) => {
    punkAPI
    .getBeer(req.params.beerId)
    .then(beer => res.render('randomBeer', { beer: beer }))
    .catch(err => console.log(`An error has occured: ${err}`));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
