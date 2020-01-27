const express = require('express');
const hbs = require('hbs');
const path = require('path');
const beers = require('./utils/beers');
const randomBeer = require('./utils/randomBeer');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the routes here
app.get('/', (req, res) => {
    return res.render('index');
});

app.get('/beers', (req, res) => {
    beers( (err, beersArr) => {
        if (err) console.log( err );
        res.render('beers', {beersArr})
    })
});

app.get('/random-beer', (req, res) => {
    randomBeer( (err, rndBeer) => {
        if (err) console.log( err );
        const {name, tagline, description, image_url} = rndBeer;
        res.render('random-beer', {name, tagline, description, image_url})
    })
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
