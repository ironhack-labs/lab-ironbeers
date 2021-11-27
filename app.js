const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, '/views/partials'));
// 

// Add the route handlers here:
//index
app.get('/', (req, res) => {
  res.render('index');
});

//beErs
app.get("/beers",(req,res,next)=>{
  punkAPI.getBeers().then(response=>{
        res.render("beers",{ beers: response})
    }).catch(error=>{
        res.send("error")
    })
})

//random beer
app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then(randomBeer => {
    console.log(randomBeer);
    res.render('randomBeer', randomBeer[0])
  })
  .catch(err => res.send('err'));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
