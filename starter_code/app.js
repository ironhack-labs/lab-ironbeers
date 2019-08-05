//require all the packages you will need
const myExpress = require('express');

//package that allows templating and dynamic views
const PORT = 3000;
const app = myExpress();
const hbs = require('hbs');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static((__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
  res.render('layout.hbs');
});



app.listen(PORT);
