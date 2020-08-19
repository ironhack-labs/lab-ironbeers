/* const express = require('express'); 
const app = express(); 

app.get("/beers", (req, res, next) => {
    // beers.getBeers()
    // .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
    // .catch(error => console.log(error))
    res.render("beers")
}); */

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

/* You should be exporting the renderBeers function like this */
// exports.renderBeers = (req, res, next) => {
//     const randomBeers = punkAPI.getBeers().then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
//     .catch(error => console.log(error));
//     res.render("beers", randomBeers);
// }

exports.renderBeers = (req, res, next) => {
    punkAPI
    .getBeers().then(beersFromApi => {res.render('beers', {beersFromApi})})
    .catch(error => console.log(error));
}