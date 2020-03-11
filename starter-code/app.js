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
hbs.registerPartials(__dirname + "/views/partials");

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get("/beers", (req, res) => {
    punkAPI
    .getBeers()
    .then(beersFromApi => {
        console.log('Beers from the database: ', beersFromApi);
        res.render("beers", {myBeers: beersFromApi});
    })
    .catch(error => console.log(error));
})

app.get("/beer/:id", (req, res) => {
    punkAPI
    .getBeer(req.params.id)
    .then(beer => {
        console.log("Beer from the database: ", beer)
      res.render("beer", {myBeer: beer[0]});
    })
    .catch(error => console.log(error));
});

app.get("/random-beers", (req, res) => {
    punkAPI
    .getRandom()
    .then(randomBeer => {
        console.log('Random beer from the database: ', randomBeer);
        res.render("random-beers", {myRandomBeer : randomBeer[0]});
    })
    .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
