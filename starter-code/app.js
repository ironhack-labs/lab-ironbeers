const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
// let testData = [{name:'JON'}, {name:'ALEX'}]

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

hbs.registerPartials(__dirname + '/views/partials')

// add the routes here:
app.get('/', (req, res) => res.render('index'));



app.get('/beers', (req,res)=>{
     punkAPI
    .getBeers()
    .then(beersFromApi =>{
         console.log('Beers from the database: ', beersFromApi);
         res.render('beers', {beer: beersFromApi});
    })
    .catch(error => console.log(error))
})

app.get('/random-beers', (req,res)=>{
    punkAPI
    .getRandom()
    .then(randomBeer =>{
        console.log('Random beer = ' + randomBeer[0].brewers_tips)
        res.render('random-beers', {randBeer:randomBeer[0]})
    })
    .catch(error => console.log(error))
})

app.listen(3000, () => console.log('listening on port 3k'));
