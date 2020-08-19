// const express = require('express'); 
// const app = express(); 

// app.get("/randombeers", (req, res, next) => res.render("randombeers"));

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

exports.renderRandomBeers = (req, res, next) => {
    punkAPI
    .getRandom()
    .then(responseFromAPI => {res.render("randombeers", {responseFromAPI})})
    .catch(error => console.log(error));    
    
}


