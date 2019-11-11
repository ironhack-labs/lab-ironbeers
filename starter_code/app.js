const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

const beerRouter = require("./routes/beers");
const randombeerRouter = require("./routes/randomBeer");
app.use(beerRouter);
app.use(randombeerRouter);

app.get('/', (req, res, next) => {
  res.render('index');
});


hbs.registerPartials(path.join(__dirname, "views/partials"));

app.listen(3000);