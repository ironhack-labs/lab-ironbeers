
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const {beersarray, randombeer} = require("./controllers")


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', beersarray);

app.get('/random', randombeer);

app.listen(3000);
