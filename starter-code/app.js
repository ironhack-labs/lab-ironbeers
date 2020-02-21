const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:


// add the routes here:
app.get('/', (req, res, next) => res.render('index'));

app.get('/beers', (req, res, next) => {
    punkAPI
        .getBeers()
        .then(beersFromApi => {
            res.render('beers', {
                beers: beersFromApi
            });
        })
        .catch(error => console.log(error));
});

app.get('/random', (req, res) => {
    punkAPI
        .getRandom()
        .then(beerFromApi  => {
            res.render('random', {beers: beerFromApi });
            console.log(beerFromApi );
        })
        .catch(error => console.log(error));
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));