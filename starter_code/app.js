const createError = require('http-errors');
const express = require('express');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


// const cookieParser = require('cookie-parser');
// const logger = require('morgan');

const app = express();
const port = 3001;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set(ejs.registerPartials(__dirname + '/views/partials'))
app.set('view engine', 'ejs');

app.use(expressLayouts);

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index', { title: 'IronBeers' });
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', { beers })
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    let number = Math.floor(Math.random()*beers.length);
    let beer = beers[number];
    console.log(beer)
    res.render('random-beers', { beer }, { beer } );
  })
  .catch(error => {
    console.log(error)
  })
});

Math.fl

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// Start the server
app.listen(port, () => console.log(`Everything is listening on port ${port}!`));

module.exports = app;