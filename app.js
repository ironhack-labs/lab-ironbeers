const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();



app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));


hbs.registerPartials(path.join(__dirname , "/views/partials")) 



//HANDLERS

app.get('/', (req, res) => {res.render('index')});


app.all("/beers", (req, res) => {
  punkAPI.getBeers()
  .then(data => {
    res.render("beers", {data})
  })
})


app.all("/random-beer", (req, res) => {
  punkAPI.getRandom()
  .then(data => {
    res.render("randomBeer", data[0])
  })
})

app.all("/beers/:id" , (req, res) => {
  punkAPI.getBeer(req.params.id)
  .then(data => {
    res.render("onebeer" , data[0])
  })
})




app.listen(4000, () => console.log('🏃‍ on port 4000'));
