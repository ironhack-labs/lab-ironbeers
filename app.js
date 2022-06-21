const express = require('express');

const hbs = require('hbs');
const { get } = require('http');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, '/views/partials'));


// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/beer', (req, res) => {
    console.log('beeeeeeerrr')

    punkAPI
        .getBeers()
        .then(beersFromApi => res.render('beer-page', { beersFromApi }))
        .catch(error => console.log(error))
})

app.get('/random-beer', (req, res) => {
    console.log('random beerrrrrrr')

    punkAPI
        .getRandom()
        .then(randomFromApi => res.render('random-beer-page', { randomFromApi }))
        .catch(error => console.log(error))

})

app.get('/select-beer/beer-:id', (req, res) => {
    punkAPI
        .getBeer(req.params.id)
        .then(beersFromApi => res.render('beer-page', { beersFromApi }))
        .catch(error => console.log(error))
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));