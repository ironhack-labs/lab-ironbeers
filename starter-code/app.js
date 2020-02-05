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
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (req, res) => res.render('index'));

    // beers route :
app.get('/beers', (req,res) => {
    punkAPI
    .getBeers()
    .then(beersFromApi => {
        res.render('beers', {beers: beersFromApi})
    })
    .catch(error => console.log(error))
});


    // random-beers route :
app.get('/random-beers', (req,res) => {
    punkAPI
    .getRandom()
    .then(oneBeer => {
        console.log(oneBeer)
        res.render('random-beers', {beer: oneBeer})
    })
    .catch(error => console.log(error))
})

    // beer by ID :
app.get('/beers/:id', (req,res) =>{
    punkAPI
    .getBeer(req.params.id)
    .then(details => {
        res.render('beer-details', {details})
    })
    .catch(erreur => console.log(erreur))
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
