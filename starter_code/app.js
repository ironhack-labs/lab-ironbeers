
const express = require('express');
const app     = express();
const hbs = require('hbs');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname + "/public"));




app.get('/', (req, res) => {
  res.render('index');
});




app.get('/beers', (req, res) => {
punkAPI.getBeers()
  .then(beers => {
    
  })
  .catch(error => {
    console.log(error);
  })
})

app.listen(3000, () => {
  console.log("listening");
});