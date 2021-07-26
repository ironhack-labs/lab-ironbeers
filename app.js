const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get("/beers", (req, res, next) => {
    punkAPI.getBeers().then((beers) => {
        console.log(beers);
        res.render('beers.hbs', {
            beers: beers
        })

    }).catch(error => console.log(error));
});

// app.get("/random-beer", (req, res, next) => {
//     punkAPI.getRandom().then((beer) => {
//         console.log(beer);
//         res.render('random-beer.hbs', {
//             beer: beer[0]
//         })

//     }).catch(error => console.log(error));
// });

app.get("/beers/beer-:id", (req, res, next) => {
    punkAPI.getBeer(req.params.id)
        .then((beer) => {
            console.log(beer);
            res.render('random-beer.hbs', {
                beer: beer[0]
            });
        }).catch(error => console.log(error));
});

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
    res.render('index');
});
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.listen(3000, () => console.log('🏃‍ on port 3000'));