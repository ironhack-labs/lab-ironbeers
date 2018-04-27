// const theBeers = [
// {name: "Golden Ale", description: "light and hoppy" },
// {name: "Watermelon Sculpin", description: "refreshing" },
// {name: "Hopsecutioner", description: "Bitter, dark, high ibu" },
// {name: "Columbus PA", description: "brewed in Ohio" },
// {name: "aguardiente", description: "not really a beer at all" },
// ]
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials') // links to partials folder
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});
  // review solutions 
app.get('/beers', (req, res, next) => {
  // let data = {allTheBeers: theBeers,
  //             exampleKey: "hello there"
  //             }; //you are gonna have to fill in the values here
              
  //             res.render('beers.hbs',  data);
  punkAPI.getBeers()
  .then(beers => {
  //  let data = {
  //    beers: beers
  //  } //
	console.log(beers) // so you can see the structure of the data
	res.render('beers', {beers}) //make sure to put the res.render inside the .then block // , data- passes data from let data (partial hbs)
  })
  .catch(error => {
    console.log(error)
  })
  });
//   .catch(error => console.log()){
    
// }

app.get('/random-beer', (req, res, next) => {
  res.render('randomBeer');
});


app.listen(3000);