const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get("/", (req, res) => {
    res.render('index')
});

app.get("/beers", (req, res) => {
    punkAPI
    .getBeers()
    .then(beersFromApi => {
        console.log('Beers from the Database: ', beersFromApi);
        res.render("beers", {theBeers: beersFromApi});
    })
    .catch(error => console.log(error));
});

app.get("/random-beers" , (req, res) => { //creates url
    punkAPI
    .getRandom()
    .then(randomBeer => {
        console.log('Random beer from the Database: ', randomBeer);
        res.render("random-beers", {myRandomBeer: randomBeer[0]}); //random-beers refer to hbs. my randombeer is used in the hbs file as a reference
     })
    .catch(error => console.log(error));
})




app.listen(3001, () => { 
    console.log('🏃‍ on port 3001')
});
