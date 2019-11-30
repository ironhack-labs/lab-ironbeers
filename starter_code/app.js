const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(responseFromDB => {
    // console.log("Response is:",  responseFromDB);
    // allBeers is the hbs file that's gonna be rendered, it comes from "views" folder
                        // "beers" is the name of a variable we will use in hbs file 
    res.render("beers.hbs", { beers: responseFromDB });
  })
  .catch(error => console.log(error));
});

app.listen(3000);
