/* eslint-disable no-console */

const express = require('express');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/beers', (req, res) => {
    punkAPI
        .getBeers()
        .then((beersFromApi) => {
            res.render('beers', { beersFromApi });
        })
        .catch((error) => console.log(error));
});

app.get('/beer-info/:id', (req, res) => {
    if (req.params.id === 'random') {
        punkAPI
            .getRandom()
            .then((beer) => res.render('beer-info', { beer }))
            .catch((error) => console.log(error));
    }
    punkAPI
        .getBeer(req.params.id)
        .then((beer) => res.render('beer-info', { beer }))
        .catch((error) => console.log(error));
});

module.exports = app;
