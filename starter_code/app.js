
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next)=>{
  punkAPI.getBeers()
  .then(beers => {
    //console.log(beers)
    res.render('beers', { beers });
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random',(req, res, next)=>{
  punkAPI.getRandom()
  .then(beers => {
    res.render('random', { beers })
  })
  .catch(error => {
    console.log(error)
  })
});


hbs.registerPartials(__dirname + '/views/partials');

// hbs.registerHelper('each', function(beers, options) {
//   let randombeer = [];
//   for(i=0; i<beers.length; i++){
//       let randombeer = beers[i]
//       randombeer.push(randombeer)
//   };
//   let ri = Math.floor(Math.random() * randombeer.length);
//   console.log(randombeer[ri])
//   return randombeer[ri];
// });

app.listen(3000);
