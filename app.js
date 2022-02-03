// https://github.com/ironhack-labs/lab-ironbeers#iteration-31-the-beers-route
const express = require('express');

const hbs = require('hbs');
const async = require('hbs/lib/async');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
// const PORT = 3000;
//setup view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerHelper(__dirname + '/views/partials');

// register where our partials will be located
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// Add the route handlers here:
// Iteration 2 - Home page
app.get('/', (req, res) => {
    res.render('index.hbs', { doctitle: 'Home Page' });
});

// Iteration 3 - Beers page - 3.1 The /beers route
app.get('/beers', (req, res) => {
    punkAPI.getBeers()
        .then(beersFromApi => {
            // console.log(beersFromApi)
            res.render('beers.hbs', { beersArr: beersFromApi, doctitle: 'Get Beers' })
        })
        .catch(error => console.log(error));
});

// Bonus: Iteration 6 - get the id from the URL
//http://expressjs.com/en/4x/api.html#req.params
app.get('/beers/:id', (req, res) => {
    punkAPI.getBeer(req.params.id)
        .then(beersFromApi => {
            // console.log(beersFromApi[0])
            res.render('beer.hbs', { aBeer: beersFromApi[0], doctitle: beersFromApi[0].name })
        })
        .catch(error => console.log(error));
});

// Iteration 4 - Random beer page - 4.1 The /random-beer route
app.get('/random-beer', (req, res) => {
    punkAPI.getRandom()
        .then(randomBeer => {
            // console.log(randomBeer)
            res.render('beer.hbs', { aBeer: randomBeer[0], doctitle: 'Random Beer' })
        })
        .catch(error => console.log(error));
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));