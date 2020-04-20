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
    punkAPI
        .getBeers()
        .then((apiResult) => {
            console.log("Beers from the database ",
                apiResult);
            res.render("beers", {
                beers: apiResult
            })
        })
        .catch((err) => {
            console.log(error)
        });
});

app.get("/random-beer", (req, res) => {
    punkAPI
        .getRandom()
        .then((apiResult) => {
            console.log("this beer is", apiResult);
            res.render("random-beer", {
                randomBeer : apiResult
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get("/beers/:id/:name", (req, res) => {
    punkAPI
        .getBeer(req.params.id)
        .then((apiResult) => {
            console.log("this beer is", apiResult);
            res.render("one-beer", {
                oneBeer: apiResult,
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));