const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// two lines that set up handlebars - always the same
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// set up public folder
app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
    punkAPI.getBeers().then((beers) => {
        res.render('beers', { allMyBeers: beers })
    })
})

app.get('/random-beers', (req, res) => {
    punkAPI
        .getRandom()
        .then(responseFromAPI => {
            // your magic happens here
            console.log('Random beer',responseFromAPI);
            res.render('random-beers', { beersArray: responseFromAPI })
        })
        .catch(error => console.log(error));

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
