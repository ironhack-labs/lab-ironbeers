const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (req, res) => res.render('index'));



app.get('/beers', (req, res) =>     
{ 
    punkAPI.getBeers()

    .then((beersFromApi) => {
        console.log('Beers from the database: ', beersFromApi); 
    
        res.render('beers', { beers: beersFromApi });
})
    .catch((error) => console.log(error));
    }); 



    app.get('/random-beer', (req, res) =>     
    { 
        punkAPI.getRandom()
    
        .then((randomBeersFromApi) => {
            console.log('Random beers from the database: ', randomBeersFromApi); 
        
            res.render('random-beer', { randomBeer: randomBeersFromApi });
    })
        .catch((error) => console.log(error));
        }); 


    app.get('/details/:id', (req, res) => {
        const id = req.params.id;

        punkAPI.getBeer(id)
        .then((data) => {
            res.render('details', { beer: data});
        })
        .catch((err) => console.log(err));
    })      


app.listen(3000, () => console.log('🏃‍ on port 3000'));
