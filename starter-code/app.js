const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + "/views/partials")

app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req,res) => {
    punkAPI
   .getBeers()
   .then(beersFromApi => {
        console.log('Beers from the database: ', beersFromApi);
        res.render('beers', {beer: beersFromApi});
   })
   .catch(error => console.log(error))
})  

app.get('/random-beer', (req,res) => {
    punkAPI
    .getRandom()
    .then(beersData => {
        let theBeer = beersData.filter(beers => beers === req.params.beers)[0];
        res.render('random-beer', {beers: theBeer});
      })
    .catch(error => console.log(error));
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
