const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
// const randomBeer = PunkAPI.getRandom()
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(__dirname + '/views/partials');

// add the routes here:
app.get('/', (req, res) => res.render('index'));


app.get('/beers', (req, res) => {
    punkAPI.getBeers()
        .then(beersFromApi => {
            console.log('Beers from the database: ', beersFromApi);
            res.render('beers', { beersFromApi });
        })
        .catch(error => {
            console.log(error)
        });
});

app.get('/randomBeers', (req, res) => {
    punkAPI.getRandom()
        .then(beersFrom => {
            console.log('Beers from the database: ', beersFrom);
            res.render('randomBeers', { beersFrom });
        })
        .catch(error => {
            console.log(error)
        });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));