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

hbs.registerPartials(__dirname + '/views/partials')

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {

    const beers = punkAPI.getBeers()
        .then(beersFromAPI => {
            //console.log(beersFromAPI)
            res.render('beers', {beersFromAPI})
        })
        .catch(err => console.log(err))
});

app.get('/random-beers', (req, res) => {

    const randomBeer = punkAPI.getRandom()
        .then(randomElement => {
            const element = randomElement[0]
            res.render('random-beers', element)
            console.log(element)
        })
        .catch(err => console.log(err))

})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
