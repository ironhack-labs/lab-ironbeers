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

hbs.registerPartials(`${__dirname}/views/partials`);

// Add the route handlers here:

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/beers', async(req, res) => {
    const beersFromApi = await punkAPI.getBeers()
    res.render('beers', {
        beersFromApi
    })
});

app.get('/random-beers', async(req, res) => {
    const randomBeer = await punkAPI.getRandom()
    res.render('random-beers', randomBeer[0])
});

async function singleBeerPages() {
    const beersFromApi = await punkAPI.getBeers();
    beersFromApi.forEach(beer => {
        const id = beer.id;
        app.get(`/beers/beer-${id}`, (req, res) => {
            res.render('random-beers', beer)
        })
    })
}

singleBeerPages();

app.listen(3000, () => console.log('🏃‍ on port 3000'));