const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/beers', (req, res, next) => {
    punkAPI.getBeers()
        .then(beers => {
            if (beers[0].image_url == null) beers[0].image_url = 'https://images.punkapi.com/v2/keg.png'
            res.render('beers', { beers })
        })
        .catch(error => {
            console.log(error)
        })
})

app.get('/random-beers', (req, res, next) => {
    punkAPI.getRandom()
        .then(beers => {
            console.log(beers[0])
            res.render('beer-random', { beers })
        })
        .catch(error => {
            console.log(error)
        })
})

app.listen(3000);