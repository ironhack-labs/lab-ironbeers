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
    punkAPI.getBeers()
    .then(response => {
        console.log(response)
        res.render('beers', { data: response });
    });
});

app.get('/random-beer', (req, res) => {
    punkAPI.getRandom()
    .then(response => {
        console.log(response)
        res.render('random-beer', { data: response });
    });
});

app.get('/beers/:id', (req, res) => {
    punkAPI.getBeer(req.params.id)
    .then(response => {
        console.log(response)
        res.render('beer', { data: response });
    });
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
