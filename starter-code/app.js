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
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get('/beers', function (req, res) {
    punkAPI
        .getBeers()
        .then(beersFromApi => {
            res.render('beers', {
                beersFromApi
            })
        })
        .catch()
})

app.get('/random-beer', function (req, res) {
    punkAPI.getRandom().then(beer => {
        res.render('random-beer', {
            beer
        })
        // console.log(beer[0].name)
    })

    // randomBeer.then(beer => {
    //     res.render('beers', { beer })
    //     // console.log(beer[0].name)
    // })
})


app.get('/beer', (req, res) => {
    let id = req.query.id;

    punkAPI
        .getBeer(id)
        .then(singleBeer => res.render('random-beer', {
            singleBeer
        }))
        .catch(error => console.log(error));
});
app.listen(3000, () => console.log('🏃‍ on port 3000'));