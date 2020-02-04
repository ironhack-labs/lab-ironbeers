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

// add the routes here:
app.get(['/', '/home'], (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
    punkAPI
        .getBeers()
        .then(beers => {
            res.render("beers", {
                beers
            });
        })
        .catch(dbErr => console.error(dbErr));
});

app.get('/random-beers', (req, res) => {
    punkAPI
        .getRandom()
        .then(beer => {
            const random = beer[0];
            res.render("random-beer", {
                random
            });
        })
        .catch(dbErr => console.error(dbErr));
});

app.get('/beers/info-beer/:id', (req, res) => {
    punkAPI
        .getBeer(req.params.id)
        .then(beer => {
            const data = beer[0];
            res.render("info-beer", {
                data
            });
        })
        .catch(dbErr => console.error(dbErr))
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
