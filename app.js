const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const port = 3000;

hbs.registerPartials(path.join(__dirname + '/views/partials'));

const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/views'));

app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = 'Beers for All';

app.get('/', (req, res) => {
    res.render('index', { home: true });
});
app.get('/beers', (req, res) => {
    punkAPI
        .getBeers()
        .then(beersFromApi => {
            const data = beersFromApi;
            res.render('beers', { beers: true, title: 'Our Selection', data: data })
        })
        .catch(error => console.error())
});

app.get('/random-beer', (req, res) => {
    punkAPI
        .getRandom()
        .then(beersFromApi => {
            const data = beersFromApi;
            res.render('random-beer', { randombeer: true, title: 'Beers at Random', data: data });
        })
        .catch(error => console.error())
});

app.get('/beers/:id', (req, res) => {
    punkAPI
        .getBeer(req.params.id)
        .then(beersFromApi => {
            const data = beersFromApi;
            res.render('random-beer', { randombeer: true, title: 'Beer', data: data });
        })
        .catch(error => console.error())
});

app.use((req, res) => {
    res.status(404).render('404', { '404': true, title: '404' });
});

app.listen(process.env.PORT || port, () => console.log(`Server is listening on port ${port}!`))
