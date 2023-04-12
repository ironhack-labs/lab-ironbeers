const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// Register the location for handlebars partials here:

// ...

// Add the route handlers here:


app.get('/', (req, res) => {
  const img="/images/beer.png"
  res.render('index',{img});
});
app.get('/beers',async(req,res)=>{

const beers=await punkAPI.getBeers()
 res.render('beers',{beers})
  
})
/*app.get('/beers', function(req, res) {
  db.getBeers()
    .then(function(beers) {
      res.render('beers', { beers: beers });
    })
   
    });*/

    app.get('/random-beer', function(req, res) {
      punkAPI.getRandom()
        .then(function(beer) {
          res.render('random-beer', { beer: beer[0] });
        })
        
    });

    app.get('/beers/:beerId', async (req, res) => {
      const beer = await punkAPI.getBeer(req.params.beerId);
       res.render('beer', { beer: beer[0] });
    });    

app.listen(3002, () => console.log('🏃‍ on port 3000'));
