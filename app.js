const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

const appRouter = require('./routes/index')

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, '/public/views/partials'));

// Add the route handlers here:

app.use("/", appRouter);

/* app.get('/test', (req, res) => {
  console.log("hello")
  res.render(path.resolve(__dirname, '../public/views/index.hbs'));
}); */

app.listen(5000, () => console.log('🏃‍ on port 3000'));
