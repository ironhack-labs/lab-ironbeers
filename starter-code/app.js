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
app.get('/', (req, res) => res.render('index'));

app.get('/beers',(req,res)=>{
    punkAPI.getBeers()
    .then(beersFromApi=>{
        res.render('beers',{beersFromApi});
       // console.log('Beers from database:',cervezas)
    })
    .catch(error=>console.log(error))

})

app.get('/random-beer',(req,res)=>{
    punkAPI.getRandom()
    .then(randomBeer=>{
        res.render('random-beer',{randomBeer});
        console.log('Beers from database:',randomBeer)
    })
    .catch(error=>console.log(error))

})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
