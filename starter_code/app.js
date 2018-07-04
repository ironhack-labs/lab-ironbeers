const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


app.use(express.static(__dirname+'/node_modules/bootstrap/dist'))
app.use(express.static(__dirname+'/node_modules/jquery/dist'))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('partials/index');
});


app.listen(3000);