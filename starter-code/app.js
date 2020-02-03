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

// add the routes here:
app.get('/', (req, res) => {
    res.render('index')
});

app.get("/beers", (req, res) => {
    punkAPI.getBeers()
    .then(beers => {
        console.log("Beers :", beers);
        res.render("beers", {array: beers});
    })
    .catch(err => console.error(err));
});

app.get("/random", (req, res) => {
    punkAPI.getRandom()
    .then(beers => {
        console.log(beers)  
        res.render("random", {beer: beers})
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
