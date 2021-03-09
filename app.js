const express = require('express');
const hbs = require('hbs');
const path = require('path');

const appRoutes = require('./routes/appRoutes');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use('/', appRoutes); //tudo que for do home vai pra appRoute

app.listen(3000, () => console.log('🏃‍ on port 3000'));
