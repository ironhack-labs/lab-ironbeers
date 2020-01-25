const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


hbs.registerPartials(path.join(__dirname, '/views/partials'));
// hbs.registerPartial("beerpartial", path.join(__dirname, '/views/partials'));

const myBeers = punkAPI.getBeers();
const randomBeer = punkAPI.getRandom();

// add the routes here
app.get('/', (req, res) => res.render('index'));
app.get('/beers', (req, res) => {
    myBeers.then((beers) => {
        res.render('beers.hbs', { beersObj: beers });
    });
    myBeers.catch((err) => {
        console.log(err);
    });
});
app.get('/random-beers', (req, res) => {
    randomBeer.then((beers) => {
        res.render('random-beer.hbs', { beers });
    });
    randomBeer.catch((err) => console.log(err));
});
app.get('/beers/:beerId', (req, res) => {

    punkAPI
        .getBeer(req.params.beerId)
        .then((beers) => {
            res.render('random-beer.hbs', { beers });
        })
        .catch((err) => {
            console.log(err);
        });
});



app.use(function (req, res, next) {
    return res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
