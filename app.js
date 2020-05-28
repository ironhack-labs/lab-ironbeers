const express = require('express');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const hbs = require('hbs');
const path = require('path');


const app = express();

const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname+"/views/partials"))
// ...

// Add the route handlers here:

hbs.registerPartials(path.join(__dirname, "/views/partials"))
// raiz
app.get('/', (req, res) => {
  res.render('index');
});
 
// Beers
app.get('/beers', (req, res) => {
  punkAPI.getBeers(req.query.image_url)
  .then(beersFromApi => {
    res.render('beers', {beersFromApi});
  })
  
});



//Random Beer

app.get('/random-beer', (req, res) => {


res.render('random-beer',);
    
});


app.listen(4000, () => console.log('🏃‍ on port 3000'));
