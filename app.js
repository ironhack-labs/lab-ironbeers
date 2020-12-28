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

hbs.registerPartials(__dirname + "/views/partials")

// Add the route handlers here:
app.get('/beers',(req, res)=>{
  punkAPI
  .getBeers()
  .then(beers => res.render("beers.hbs", {beers}))
  .catch(error => console.log(error)); 
});



app.get('/random-beers',(req, res)=>{

  punkAPI
  .getRandom()
  .then(random =>res.render("random-beers.hbs", {random: random[0]}))
  .catch(error => console.log(error));
 
});


app.get('/random-beers',(req, res)=>{
  const random = punkAPI.getRandom()
  const randImg = random.image_url !== null 
  random
    .then(random => {
      random = random[0]
  
      res.render("random-beers.hbs", {random})
      // your magic happens here
    })
    .catch(error => console.log(error));
  });


//image_url: null fix if happens
// get rid of beers with no image .image_url !== null
// 1-25 have img thats why no prob
// total 325
// last with img 257
// .filter(random => random.image_url != null) does not work prob cuz 1 beer returns


app.get('/', (req, res) => {
  res.render('index');
});




app.listen(3000, () => {
  console.log('🏃‍ on port 3000')
});








