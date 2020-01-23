// Dependecies
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

const myBeer = punkAPI.getBeers();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Add the routes here
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) =>  {
    myBeer.then(beer => {
        res.render('beers', {beer});
    });
    myBeer.catch(error => 
        console.log(error));    
});

app.get('/random-beer', (req, res) => res.render('random-beer'));

// Start server
app.listen(3000, () => console.log('🏃‍ on port 3000'));
