const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', { beersFromApi }))

    .catch(error => console.log(error));
});
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI =>res.render('random-beers',{responseFromAPI })) 
    .catch(error => console.log(error));
});

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ...
app.get('/beers/beer-:id',(req,res)=>{
  const beerId=req.params.id
  punkAPI
  .getBeer(beerId)
  .then(responseFromAPI=> res.render('random-beers',{responseFromAPI}))
  .catch(error => console.log(error));

}
)
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
