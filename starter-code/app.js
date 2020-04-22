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
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get("/beers", (req, res) => {
    const getOnly25beers = punkAPI.getBeers(); //{"hops": "amarillo"}
    getOnly25beers.then( beerArray => {
        console.log( beerArray.length + 28);
        res.render("beers", {beers: beerArray})

    } )
    getOnly25beers.catch( error => console.log(error));
});

app.get("/random-beer", (req, res) => {
    const getRandom = punkAPI.getRandom();
    getRandom.then( beerArray => {
        console.log('randm beer:', beerArray);
        res.render("random-beer", {rndmBeer: beerArray[0]})
    } )
    getRandom.catch(error => console.log(error))
});

app.listen(3001, () => console.log('🏃‍ on port 3001 '));
