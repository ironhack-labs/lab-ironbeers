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
hbs.registerPartials(path.join(__dirname, "./views/partials"));
// hbs.registerPartial("footer", "{{footer}}");

// add the routes here:
app.get('/', (req, res) => res.render('index'));

// Route to Beers Page
app.get('/beers', (req, res) => {
    punkAPI.getBeers()
    .then(beersFromAPI => {
        console.log({beersFromAPI});
        res.render('beers', {beersFromAPI})
    })
    .catch(error => console.log(error));
})

// Route to Random Beer Page
app.get('/random-beer', (req, res) => {
    punkAPI
    .getRandom()
    .then(resAPI => {
        res.render('random-beer', {randBeer: resAPI[0]})
    })
    .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ http://localhost:3000/'));
