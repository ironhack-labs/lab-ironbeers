const express = require('express');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const punkAPI = new PunkAPIWrapper();

const app = express();

app.get('/', (req, res) => {
    res.render('home');
  });

app.get('/beers', async (request, response) => {
    try {
        const beers = await punkAPI.getBeers();
        response.render('beers', { beers });
    } catch (error){

    }
});

app.get('/random-beers', async (request, response) => {
    try {
        const beer = await punkAPI.getRandom();
        response.render('random-beer', beer[0]);
    } catch (error){

    }
});
  
module.exports = app;