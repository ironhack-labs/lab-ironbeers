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

app.get('/beers', (req, res) => {
    punkAPI
        .getBeers()
        .then((apiResponse) => {
            res.render('beers.hbs', {
                beers: apiResponse,
            });
        })
        .catch((apiErr) => console.log(apiErr));
});

app.get('/beers/:id', (req, res) => {
    const id = req.params.id;
    punkAPI
        .getBeer(id)
        .then((apiResponse) => {
            res.render('singleBeer.hbs', {
                beer: apiResponse[0]
            });
        })
        .catch((apiError) => {
            console.log(apiError);
        });
});

app.get('/random-beer', (req, res) => {
    punkAPI
        .getRandom()
        .then((apiResponse) => {
            res.render('randomBeer.hbs', {
                oneBeer: apiResponse[0],
            });
        })
        .catch((apiErr) => console.log(apiErr));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));