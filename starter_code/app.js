
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials')



//Home 

app.get("/", (req, res, next)=>{
  res.render("index")
})

//Beers
app.get('/beers', (req, res, next) => {

  punkAPI.getBeers().then(beer => {
    console.log(beer)
    let data = {beer: beer};
    res.render('beers', data);
});
})


//Random Beers
app.get('/random-beers', (req, res, next) => {

  punkAPI.getRandom().then(beers => {
    console.log(beers[0])
    let data = beers[0];
    res.render('random-beers', data);
});
})




app.listen(3000);
