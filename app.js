const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));


// Add the route handlers here:

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/beers', (req, res) => {
    punkAPI.getBeers().then(Beers => {
        console.log(Beers);
        res.render('beers', { beers: Beers })

    })

});

app.get('/random-beers', (req, res) => {
    punkAPI.getRandom().then(Beers => {

        let theBeer = Beers[0]
        res.render('randomBeers', { theBeer })

    })

});

app.get('/beers/:name', (req, res) => {
    const beer = beers.find(function(beer) {
        return beer.name === req.params.name;
    })
    res.render('beerDetails', { clickedBeer: beer })
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));