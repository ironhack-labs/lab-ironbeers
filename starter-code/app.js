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
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))

// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get('/beers', (req, res) => {
    punkAPI.getBeers()
        .then(beersArr => {
            res.render('beers', {
                beersArr
            })
            console.log(beersArr)
        })
})

app.use('/beers', function (req, res) {
    picked = req.path.slice(1)
    punkAPI.getBeer(picked)
        .then(beer => {
            res.render('picked-beer', {
                beer
            })
        })

})

app.get('/random-beers', (req, res) => {
    punkAPI.getRandom()
        .then(randomArr => {
            res.render('random-beers', {
                randomArr
            })
            console.log(randomArr)
        })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));