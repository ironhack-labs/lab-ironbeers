const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const port = 3000;

hbs.registerPartials(path.join(__dirname, 'views/partials'));

const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = 'Beers for All';

app.get('/', (req, res) => {
    res.render('index', { home: true });
});
app.get('/beers', (req, res) => {
    punkAPI
        .getBeers()
        .then(beers => {
            res.render('beers', { beers: true, title: 'Our Selection', beers: beers })
        })
        .catch(error => console.error())
});

app.get('/random-beer', (req, res) => {
    punkAPI
        .getRandom()
        .then(beers => {
            const beer = beers[0];
            res.render('random-beer', { randombeer: true, title: 'Beers at Random', beer: beer });
        })
        .catch(error => console.error())
});

app.get('/beers/:id', (req, res) => {
    const id = req.params.id;
    punkAPI
        .getBeer(id)
        .then(beers => {
            const beer = beers[0];
            res.render('random-beer', { randombeer: true, title: 'Beer', beer: beer });
        })
        .catch(error => console.error())
});

app.use((req, res) => {
    res.status(404).render('404', { '404': true, title: '404' });
});

app.listen(process.env.PORT || port, () => console.log(`Server is listening on port ${port}!`))
