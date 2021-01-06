
const path = require('path'); //dependencia que viene con express
const express = require('express');
const app = express();

//Ironbeers
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


//CONFIG VIEW ENGINE

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
require('./configs/hbs.config')

//Middelwares Ironbeers

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true}));

/* //peticion lista cervezas

app.get('/beers', (req, res, next) => {
    punkAPI
      .getBeers()
      .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
      .catch(error => console.log(error));
})*/

//CONFIG ROUTER
app.use((req,res,next) => {
    res.locals.path = req.path;
    next();
})
const router = require('./configs/router.config')
app.use('/', router)


// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

// CONFIG PUERTO

const port = process.env.PORT || 3000; //existe la variable Port o el 3000
app.listen(port, () => console.log(`working on port ${port}`));
