const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// access partials from /views/partials
hbs.registerPartials(path.join(path.join(__dirname,"views"),"partials"));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then((beers)=>{
      res.render('beers',{beers});
    })
    .catch((error)=>{alert("Sorry. Failed to get the beers. (Error: "+error+")");});
});

// show a random beer when so requested
app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
    .then((beer)=>{
      console.log("Rendering '",beer);
      res.render('randombeer',beer[0]);
    })
    .catch((error)=>{alert("Sorry. Failed to get a random beer.");});
});

/* a single beer based on id
   should find a way to pass a param to a request I think with ?id
*/
app.get('/beer/:id', (req, res, next) => {
  console.log("Beer Params: ",req.params);
  punkAPI.getBeer(req.params.id)
    .then((beer)=>{
      console.log("The beer with id "+req.params.id+": ",beer);
      res.render('randombeer', beer[0]);
    })
    .catch((error)=>{alert("Sorry. Failed to get beer.");});
});

// run the bugger...
app.listen(3000);
