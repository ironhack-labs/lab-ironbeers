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

app.get('/beers', (req, res) => {
    punkAPI
        .getBeers()
        .then(beersFromApi => (res.render('beers', {beersFromApi})))
        .catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {
    punkAPI
        .getRandom()
        .then(resposFromAPI => {
            console.log(resposFromAPI)
            res.render('random-beers', {resposFromAPI})
        })
        .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));


/*{ id: 25,
    name: 'Bad Pixie',
    tagline: 'Spiced Wheat Beer.',
    first_brewed: '10/2008',
    description:
     '2008 Prototype beer, a 4.7% wheat ale with crushed juniper berries and citrus peel.',
    image_url: 'https://images.punkapi.com/v2/25.png',
    abv: 4.7,
    ibu: 45,
    target_fg: 1010,
    target_og: 1047,
    ebc: 8,
    srm: 4,
    ph: 4.4,
    attenuation_level: 79,
    volume: { value: 20, unit: 'litres' },
    boil_volume: { value: 25, unit: 'litres' },
    method:
     { mash_temp: [Array],
       fermentation: [Object],
       twist: 'Crushed juniper berries: 12.5g, Lemon peel: 18.8g' },
    ingredients:
     { malt: [Array],
       hops: [Array],
       yeast: 'Wyeast 1056 - American Ale™' },
    food_pairing:
     [ 'Poached sole fillet with capers',
       'Summer fruit salad',
       'Banana split' ],
    brewers_tips:
     'Make sure you have plenty of room in the fermenter. Beers containing wheat can often foam aggressively during fermentation.',
    contributed_by: 'Sam Mason <samjbmason>*/
