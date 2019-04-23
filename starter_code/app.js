
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

hbs.registerPartials(__dirname + '/views/partials')

app.use(express.static(path.join(__dirname, 'public')));


//Renders Main Page
app.get('/', (req, res, next) => {
  res.render('index');
});

// Renders Beers Page
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers().then(beer => {
    let data = {beer: beer};
  res.render('beers' , data);
});
});

// Renders Random-Beers Page
app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom().then(beer => {
    
    
  res.render('random-beers', {beer});
})
.catch(err => {
  next(err);
})
});

app.listen(3000);

