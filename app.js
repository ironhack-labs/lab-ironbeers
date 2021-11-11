const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

hbs.registerPartials(path.join(__dirname, 'views/partials'));
const punkAPI = new PunkAPIWrapper();
const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/beers', (req, res) => {
    getBeers(res);
});
app.get('/beers/beer-*', (req, res) => {
    const id = req.url.replace('/beers/beer-', '');
    getBeer(res, id);
});
app.get('/random-beer', (req, res) => {
    getRandom(res);
});
app.listen(3000, () => console.log('🏃‍ on port 3000'));

function getBeers(res) {
    punkAPI
        .getBeers()
        .then(beers => res.render('beers', {beers}))
        .catch(error => console.log(error));
}

function getRandom(res) {
    punkAPI
        .getRandom()
        .then(randomBeer => {
            console.log(randomBeer[0])
            res.render('random-beer', {randomBeer: randomBeer[0]});
        })
        .catch(error => console.log(error));
}

function getBeer(res, id) {
    punkAPI
        .getBeer(id)
        .then(randomBeer => {
            console.log(randomBeer[0])
            res.render('random-beer', {randomBeer: randomBeer[0]});
        })
        .catch(error => console.log(error));
}