const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
    res.render('index');
});

app.get("/beersPage", (req, res) => {
    punkAPI
        .getBeers()
        .then(beersArray => {
            console.log("Beers from the database: ", beersArray)
            res.render("beersPage", { newname: beersArray })
        })
        .catch(error => console.log(error));
})

app.get('/random', (req, res) => {
    punkAPI
        .getRandom()
        .then(randomBeer => {
            console.log("plop", randomBeer)
            res.render('random', { randomBeer });
        })
        .catch(error => console.log(error));
});

app.get("/bonusPage", (req, res) => {
    punkAPI
        .getBeers()
        .then(beersArray => {
            console.log("Beers from the database: ", beersArray)
            res.render("bonusPage", { newname: beersArray })
        })
        .catch(error => console.log(error));
});

app.use((req, res) => {
    res.status(404).send("Not Found!")
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
app.listen(3000, () => console.log('🏃‍ on port 3000'));