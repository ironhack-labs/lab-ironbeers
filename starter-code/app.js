const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

const app = express();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


// add the partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// add the routes here:
app.get('/', (req, res) => {
    res.render('index', {
    styles: ['styles.css']
    });
})

// punkAPI

// got 25 beers here
app.get('/beers', (req, res) => {
    punkAPI.getBeers()
        .then(apiResponse => {
            res.render('beers.hbs', {
            beer: apiResponse
            });
        })
        .catch((err) => {
            console.log(err);
    })

});

// get a random beer
app.get('/random-beers', (req, res) => {
    punkAPI.getRandom()
        .then((responseFromAPI) => {
            res.render('random-beers.hbs', {
                beer: responseFromAPI
            });
        })
        .catch(error => console.log(error))
});

// display the info according to the id
app.get('/beers/:id', (req, res) => {

    punkAPI.getBeer(req.params.id)
        .then(dbResponse => {
            res.render('beers.hbs', {
               beer: dbResponse         // here needs to be the same variable name as in the '/beers' on line 34
            });
        })
        .catch(error => console.log(error))
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
