// require all the packages you install
const express = require('express');
const app = express();

// package that allows templating and dynamic views
const hbs = require('hbs');

// sets hbs as default view engine
app.set('view engine', 'hbs');

// in order to use the partials I have to register them!
hbs.registerPartials(__dirname + '/views/partials');



const path    = require('path');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const punkAPI = new PunkAPIWrapper();


// routes:

app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});



app.listen(3000);
