const express = require('express'); // al ejecutar express lo que tienes es un objeto
const { get } = require('express/lib/response');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express(); //este es tu servidor. 
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public'))); //all static files are in public file.
//static files can be styles, images.

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res) => {

  punkAPI
  .getBeers()
  .then(beersFromApi => { /* console.log('Beers from the database: ', beersFromApi)  */
  res.render('beers',{beersFromApi});
})
  .catch(error => console.log(error));

});


app.get('/random-beer', (req, res) => {

  punkAPI
  .getRandom()
  .then(responseFromAPI => {

    res.render('random-beer',{responseFromAPI});

  })
  .catch(error => console.log(error));  
});

app.get('/:id', (req, res) => {
punkAPI
.getBeer(req.params.id)
.then(beerID => {
res.render('beersbyid',{beerID});
})
.catch(error => console.log(error));

});

//punkAPI.



app.all('*', (req, res) => {
  res.status(404).send('<h1>Resource not found</h1>');
})






app.listen(3000, () => console.log('🏃‍ on port 3000'));
