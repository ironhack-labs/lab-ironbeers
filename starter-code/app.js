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
    punkAPI.getBeers()
    .then(beersFromApi=>{
        //console.log('Beers from database: ',beersFromApi)
        res.render('beers', {beersFromApi})
    })
    .catch(err=>console.log(err))
    });

app.get('/random-beers', (req, res) => {
    punkAPI.getRandom()
    .then(beersFromApi=>{
    //console.log('Beers from database: ',beersFromApi)
    const beer={...beersFromApi[0],"randomBeer":true}
    res.render('random-beer',{beer})
    })
    .catch(err=>console.log(err))
});

app.get('/beers/:id?', (req, res) => {
    //console.dir(req.params.id)
    punkAPI.getBeer(req.params.id)
    .then(beersFromApi=>{
        //console.log('Beers from database: ',beersFromApi)
        res.render('beers', {beersFromApi})
    })
    .catch(err=>console.log(err))
    });
app.listen(3000, () => console.log('🏃‍ on port 3000'));
