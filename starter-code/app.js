const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get('/beers', (req, res) => {
    punkAPI.getBeers()
        .then(beers => res.render('beers', {
            beers
        }))
        .catch(err => console.log('Ha ocurrido un error: ' + err));
});
app.get('/random_beers', (req, res) => {
    punkAPI.getRandom()
        .then(randomBeer => res.render('random_beers', {
            random: randomBeer[0]
        }))
        .catch(err => console.log("Ha ocurrido un error: " + err))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));