const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(path.join(__dirname, 'views/partials'));
hbs.registerPartial("beerpartial", "{{beerpartial}}");
hbs.registerPartial("randombeerpartial", "{{randombeerpartial}}");

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get('/beers', (req, res) => {
    punkAPI
    .getBeers()
    .then(beersFromApi => {
        // console.log('Beers from the database: ', beersFromApi);
        res.render('beers', {beersFromApi})
    })
    .catch()
});

app.get('/random-beer', (req, res) => {
    punkAPI
    .getRandom()
    .then(responseFromAPI => {
        // your magic happens here
        console.log('Getting random beer from ', responseFromAPI);
        res.render('random-beer', {responseFromAPI})

      })
    .catch(error => console.log(error));
})

app.get('/beer/', (req, res) => {
    let id = req.query.id;

    punkAPI
        .getBeer(id)
        .then(responseFromAPI => res.render('random-beer', {responseFromAPI}))
        .catch(error => console.log(error));
});
// res.render('ranbom-beer'));

app.listen(3000, () => console.log('🏃‍ on port 3000'));
