const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

//register partials path below
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  //predefined method from API
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from database', beersFromApi);
      //when I get beers json object from API I will draw/copy of this on my hbs to bring it on your page!! and in beers.hbs file I will choose what to show you from that database that is why I write as my responde 'beers' I want to send you this file and I create a key for my received database object, so I can refer to it in my 'beers.hbs' file - to decide which elements from that whole database to show you
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('random-beers', { random: responseFromAPI });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
