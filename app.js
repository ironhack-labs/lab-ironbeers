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

// Partials setup
hbs.registerPartials(path.join(__dirname, 'views/partials'))


// View routes
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) =>  {
    const myBeers = punkAPI.getBeers();
    myBeers.then(beers => {
        console.log(beers);
        res.render('beers', beers);
    });
    myBeers.catch(error => 
        console.log(error));    
});

app.get('/random-beer', (req, res) =>  {
    const myRandomBeer = punkAPI.getRandom();
    myRandomBeer.then(beer => {
        console.log(beer);
        res.render('random-beer', beer[0]);
    });
    myRandomBeer.catch(error => 
        console.log(error));    
});

// Start server
app.listen(3000, () => console.log('🏃‍ on port 3000'));
