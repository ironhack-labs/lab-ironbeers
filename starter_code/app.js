const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

const beersRouter = require('./routes/beer');
const randomRouter = require('./routes/randombeer');
const homeRouter = require('./routes/index');


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.use(express.static(path.join(__dirname, 'public')));


//get method route
app.use('/', homeRouter);
app.use('/beers', beersRouter);
app.use('/random-beers', randomRouter);



app.get('/', (req, res, next) => {
  res.send('homePage');
});




app.listen(3000);
