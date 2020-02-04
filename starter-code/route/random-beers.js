const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();

const punkAPI = new PunkAPIWrapper();

router.get("/random-beers", (req, res) => {
       const randomBeer = PunkAPI.getRandom()

    randomBeer.then(beer => {
        alert(beer[0].name)
    })