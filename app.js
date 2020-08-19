const express           = require('express');
const hbs               = require('hbs');
const path              = require('path');
const app               = express();

const PunkAPIWrapper    = require('punkapi-javascript-wrapper');
const punkAPI           = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + "/views/partials")

// ROUTES

app.get('/', (req, res) => { res.render('index') });

app.get('/beers', (req, res) => {

  punkAPI
  .getBeers()
  .then(beers => res.render('beers', { beers }))
  .catch(error => console.log(error));
  
});

app.get('/random', (req, res) => { 
  
  punkAPI
  .getRandom()
  .then(beer => { res.render('random', beer[0]) })
  .catch(error => console.log(error));  

});

app.get('/beers/:beersId', (req, res) => { 

  const { beersId } = req.params;
  
  punkAPI
  .getBeer(beersId)
  .then(beer => { res.render('random', beer[0]) })
  .catch(error => console.log(error));  

});

// SERVER

app.listen(3000, () => console.log('🏃‍ on port 3000'));
