const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const app = express();
const punkAPI = new PunkAPIWrapper();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


//MAGIA
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
    punkAPI.getBeers()
        .then(beersFromAPI =>
            res.render('beers', { beers: beersFromAPI })
        )
        .catch(error => console.log(error))
})

app.get('/random-beers', (req, res) => {
    punkAPI.getRandom()
        .then(responseFromAPI => {
            res.render('random-beers', { randomBeers: responseFromAPI[0] })
            console.log(responseFromAPI[0])
        })
        .catch(error => console.log(error))
})
app.listen(3000, () => console.log('🏃‍ on port 3000'));