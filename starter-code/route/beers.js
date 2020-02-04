const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();

const punkAPI = new PunkAPIWrapper();

    router.get("/beers", (req, res) => {
        punkAPI
            .getBeers()
            .then(dbRes => {
                console.log(dbRes)
                res.render("beers", {
                    beers: dbRes
                });
            })
            .catch(err => console.log(err));
    });