
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  const images = "/images/beer.png";
  
  res.render('index', {img: images});
});

// app.get('/beers', (req, res, next) => {
//   res.render('beers');
// });


app.get("/beers", (req, res)=> {
  punkAPI.getBeers().then(beers => {
    console.log(beers);
    res.render("beers", {beers})
    
  }).catch(error =>{
    
    console.log(error)
  })
  
})


app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    console.log('random',beers)
    res.render('random-beers', {beers});
  
    })
    .catch(error => {
      console.log(error)
    })
});



app.listen(3005);
