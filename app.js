const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('index');
  });

app.get('/beers', function (req, res, next) {
    
    punkAPI.getBeers() 
        .then(beersFromApi => {
            console.log('Beers from the database: ', beersFromApi)
            res.render('beers', {
                allBeers: beersFromApi,
            });
        })
        .catch(error => console.log(error));
});

app.get('/random-beer', function (req, res, next) {
    punkAPI.getRandom() 
        .then(responseFromAPI => {
            console.log('RandomBeer ', responseFromAPI)
            res.render('random-beer', responseFromAPI[0],
            );
        })
        .catch(error => console.log(error));
});


// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname,'views/partials'))

// Add the route handlers here:



app.listen(3000, () => console.log('🏃‍ on port 3000'));
