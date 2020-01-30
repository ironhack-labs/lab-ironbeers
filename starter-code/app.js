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
hbs.registerPartials(__dirname + '/views/partials');

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
    let beers = punkAPI.getBeers().then(function (beersFromApi) {
        // res.send(beersFromApi)
        res.render('beers.hbs', { beerList: beersFromApi })
    }).catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {
    let randomBeer = punkAPI.getRandom().then(function (randomBeerFromApi) {
        res.render('random.hbs', randomBeerFromApi[0])
    }).catch(error => console.log(error))
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
