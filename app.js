// Dependecies
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const app = express();
const punkAPI = new PunkAPIWrapper();

// App setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// API calls
const myBeers = punkAPI.getBeers();
const myRandomBeer = punkAPI.getRandom();


// View routes
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) =>  {
    myBeers.then(beers => {
        res.render('beers', {beers});
    });
    myBeers.catch(error => 
        console.log(error));    
});

app.get('/random-beer', (req, res) =>  {
    myRandomBeer.then(beers => {
        console.log(beers);
        res.render('random-beer', {beers});
    });
    myRandomBeer.catch(error => 
        console.log(error));    
});

// Start server
app.listen(3000, () => console.log('🏃‍ on port 3000'));
